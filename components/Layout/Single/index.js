import { BlockRenderer } from "components/BlockRenderer";
import { Header } from "components/Layout/Header";
import { Footer } from "components/Layout/Footer";

import { PageWrapper } from "context/page";
import Head from "next/head";

import { useEffect } from "react";
import TagManager from "react-gtm-module";

export const Single = (props) => {
  //console.log("PAGE PROPS: ", props);

  useEffect(() => {
    if (process.env.TAG_MANAGER_ID) {
      const tagManagerArgs = {
        gtmId: process.env.TAG_MANAGER_ID,
      };
      TagManager.initialize(tagManagerArgs);
    }
  }, []);

    useEffect(() => {
      markerSDK.loadWidget({
        project: '676469159e6c06bd6042f3c2',
      });
    }, []);

    
    let postData = JSON.parse(props.data.nodeByUri.postData);
    let related = postData.related;
    console.log(related)

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
