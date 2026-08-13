import { BlockRenderer } from "components/BlockRenderer";
import { Header } from "components/Layout/Header";
import { Footer } from "components/Layout/Footer";
import { NextProject } from "components/Parts/NextProject";

import { PageWrapper } from "context/page";
import Head from "next/head";
import Image from "next/image";

import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { getVimeoEmbedUrl } from "utils/getVimeoEmbedUrl";

export const Project = (props) => {
  console.log("PAGE PROPS: ", props);

  useEffect(() => {
    if (process.env.TAG_MANAGER_ID) {
      const tagManagerArgs = {
        gtmId: process.env.TAG_MANAGER_ID,
      };
      TagManager.initialize(tagManagerArgs);
    }
  }, []);

  console.log(props.postData);
  const vimeoHeroEmbedUrl = getVimeoEmbedUrl(
    props.postData?.vimeo_hero_video || props.postData?.vimeoHeroVideo,
  );

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

      <div className="projectHero">
        <div className="container">
          <div className="tag">Project</div>
          <h1>{props.title}</h1>
          <div className="cat">
            {props.postData.year && <>&copy; {props.postData.year}</>}
          </div>
        </div>

        <div className="projectHero__figure">
          {vimeoHeroEmbedUrl && (
            <iframe
              src={vimeoHeroEmbedUrl}
              title={`${props.title} hero video`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {!vimeoHeroEmbedUrl && props.postData.hero_video && (
            <video src={props.postData.hero_video.url} autoPlay muted loop />
          )}
          {!vimeoHeroEmbedUrl && !props.postData.hero_video && props.postData.hero_image && (
            <Image
              src={props.postData.hero_image}
              width={1920}
              height={1080}
              alt={props.title || ""}
            />
          )}
        </div>
      </div>

      <BlockRenderer pageBlocks={props.blocks} />

      <NextProject project={props.postData?.related} />

      <BlockRenderer pageBlocks={props.footerBlocks} />

      <Footer />
    </PageWrapper>
  );
};
