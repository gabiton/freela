import { gql } from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { graphqlRevalidate } from "./graphqlSettings";

export const getPageStaticProps = async (context) => {
  //console.log("CONTEXT: ", context);
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  let queryContext = {
    headers: {
      authorization: `${
        context.previewData && context.previewData.token && context.preview ? "Bearer " + context.previewData.token : ""
      }`,
    },
    fetchOptions: {
      next: { revalidate: context.preview ? 1 : graphqlRevalidate },
    },
  }

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocks
            featuredImage {
              node {
                sourceUrl
              }
            }
            seo {
              title
              metaDesc
            }
            preview {
              node {
                blocks
              }
            }
          }
        }
        siteMenus
        siteOptions
       
      }
    `,
    variables: {
      uri,
    },
    context: queryContext,
  });


  let blocks;
  let revalidate;
  if ( context.preview && data.nodeByUri.preview && data.nodeByUri.preview.node ) {
    blocks = cleanAndTransformBlocks(data.nodeByUri.preview.node.blocks || null);  
  } else {
    blocks = cleanAndTransformBlocks(data.nodeByUri.blocks || null);
  }
  

  return {
    props: {
      data: data,
      seo: data.nodeByUri.seo || null,
      title: data.nodeByUri.title || null,
      featuredImage: data.nodeByUri.featuredImage?.node?.sourceUrl || null,      
      blocks: blocks || null,
      menus: data.siteMenus,
      options: data.siteOptions,
      
      /* preview debug */
      queryContext: queryContext,
      contextPreview: context.preview || null,
      previewData: context.previewData || null,
      previewblocks: data.nodeByUri.preview
      
    },
    revalidate: context.preview ? 1 : graphqlRevalidate,
  };
};
