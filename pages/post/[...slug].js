import { gql } from "@apollo/client";
import client from "client";
import { Single } from "components/Layout/Single";
import { cleanAndTransformBlocks } from "../../utils/core/cleanAndTransformBlocks";

export default Single;

export const getServerSideProps = async (context) => {
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  let queryContext = {
    headers: {
      authorization: `${
        context.previewData && context.previewData.token && context.preview
          ? "Bearer " + context.previewData.token
          : ""
      }`,
    },
  };

  const { data } = await client.query({
    query: gql`
      query PostQuery($uri: String!) {
  nodeByUri(uri: $uri) {
    ... on Post {
      postData
      id
      title
      blocks
      featuredImage {
        node {
          sourceUrl
          altText
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
      date
      categories {
        nodes {
          name
        }
      }
      tags {
        nodes {
          name
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
  siteMenus(uri: $uri)
  siteOptions
}
    `,
    variables: { uri },
    context: queryContext,
    fetchPolicy: "network-only", // Ensure fresh data
  });

  let blocks;
  if (context.preview && data.nodeByUri.preview && data.nodeByUri.preview.node) {
    blocks = cleanAndTransformBlocks(data.nodeByUri.preview.node.blocks || null);
  } else {
    blocks = cleanAndTransformBlocks(data.nodeByUri.blocks || null);
  }

  return {
    props: {
      data,
      seo: data.nodeByUri.seo || null,
      title: data.nodeByUri.title || null,
      featuredImage: data.nodeByUri.featuredImage?.node?.sourceUrl || null,
      blocks: blocks || null,
      menus: data.siteMenus,
      options: data.siteOptions || null,
    },
  };
};