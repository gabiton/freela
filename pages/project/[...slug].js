import { gql } from "@apollo/client";
import client from "client";
import { Project } from "components/Layout/Project";
import { cleanAndTransformBlocks } from "utils/core/cleanAndTransformBlocks";
import { graphqlRevalidate } from "utils/core/graphqlSettings";

export default Project;

const parsePostData = (postData) => {
  if (!postData) {
    return null;
  }

  try {
    return JSON.parse(postData);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const FOOTER_BLOCK_NAME = "acf/footer";

const getFooterBlock = (blocks) =>
  Array.isArray(blocks) ? blocks.find((block) => block.name === FOOTER_BLOCK_NAME) : null;

const removeFooterBlock = (blocks) =>
  Array.isArray(blocks) ? blocks.filter((block) => block.name !== FOOTER_BLOCK_NAME) : [];

const getProjectFooterBlocks = (projectBlocks, footerSourceBlocks) => {
  const blocks = Array.isArray(projectBlocks) ? projectBlocks : [];
  const footerBlock = getFooterBlock(footerSourceBlocks) || getFooterBlock(blocks);

  return footerBlock ? [footerBlock] : null;
};

export const getStaticProps = async (context) => {
  const uri = context.params?.slug
    ? `/project/${context.params.slug.join("/")}/`
    : "/project/";

  const queryContext = {
    headers: {
      authorization: `${
        context.previewData && context.previewData.token && context.preview
          ? "Bearer " + context.previewData.token
          : ""
      }`,
    },
    fetchOptions: {
      next: { revalidate: context.preview ? 1 : graphqlRevalidate },
    },
  };

  const { data } = await client.query({
    query: gql`
      query ProjectQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          __typename
          ... on Project {
            id
            title
            postData
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
        home: nodeByUri(uri: "/") {
          ... on Page {
            blocks
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

  if (!data.nodeByUri || data.nodeByUri.__typename !== "Project") {
    return {
      notFound: true,
    };
  }

  const projectBlocks =
    context.preview && data.nodeByUri.preview?.node
      ? data.nodeByUri.preview.node.blocks || null
      : data.nodeByUri.blocks || null;

  const blocks = cleanAndTransformBlocks(removeFooterBlock(projectBlocks));
  const footerBlocks = cleanAndTransformBlocks(
    getProjectFooterBlocks(projectBlocks, data.home?.blocks || null)
  );

  return {
    props: {
      data,
      seo: data.nodeByUri.seo || {
        title: data.nodeByUri.title || "",
        metaDesc: "",
      },
      title: data.nodeByUri.title || null,
      featuredImage: data.nodeByUri.featuredImage?.node?.sourceUrl || null,
      postData: parsePostData(data.nodeByUri.postData),
      blocks: blocks || null,
      footerBlocks: footerBlocks || null,
      menus: data.siteMenus,
      options: data.siteOptions,
      queryContext,
      contextPreview: context.preview || null,
      previewData: context.previewData || null,
      previewblocks: data.nodeByUri.preview,
    },
    revalidate: context.preview ? 1 : graphqlRevalidate,
  };
};

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllProjectsQuery {
        projects {
          nodes {
            uri
          }
        }
      }
    `,
  });
  return {
    paths: [...data.projects.nodes]
      .filter((project) => project.uri !== "/project/")
      .map((project) => ({
        params: {
          slug: project.uri
            .replace(/^\/project\/?/, "")
            .replace(/\/$/, "")
            .split("/")
            .filter(Boolean),
        },
      })),
    fallback: false,
  };
};
