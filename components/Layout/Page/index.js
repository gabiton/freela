import { BlockRenderer } from "components/BlockRenderer";
import { Header } from "components/Layout/Header";
import { Footer } from "components/Layout/Footer";

import { PageWrapper } from "context/page";
import Head from "next/head";

import { useContext, useEffect } from "react";
import TagManager from "react-gtm-module";

export const Page = (props) => {
  //console.log("PAGE PROPS: ", props);

  useEffect(() => {
    if (process.env.TAG_MANAGER_ID) {
      const tagManagerArgs = {
        gtmId: process.env.TAG_MANAGER_ID,
      };
      TagManager.initialize(tagManagerArgs);
    }
  });

  return (
    <PageWrapper
      value={{
        title: props.title,
        featuredImage: props.featuredImage,
        props: props,
      }}
    >
      <Head>
        <title>{props.seo.title}</title>
        <meta name="description" content={props.seo.metaDesc} />
      </Head>

      <Header></Header>

      <BlockRenderer pageBlocks={props.blocks} />

      <Footer />
    </PageWrapper>
  );
};
