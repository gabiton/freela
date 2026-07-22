import { BlockRenderer } from "components/BlockRenderer";
import { Header } from "components/Layout/Header";
import { Footer } from "components/Layout/Footer";

import { PageWrapper } from "context/page";
import Head from "next/head";

import { useContext, useEffect } from "react";
import TagManager from "react-gtm-module";
import Lenis from 'lenis'

import markerSDK from '@marker.io/browser';
import { SingleHero } from "@/components/Parts/SingleHero";


export const Single = (props) => {
  //console.log("PAGE PROPS: ", props);

  	useEffect(() => {
		if (process.env.TAG_MANAGER_ID) {
			const tagManagerArgs = {
				gtmId: process.env.TAG_MANAGER_ID,
			};
			TagManager.initialize(tagManagerArgs);

			
		}

    const lenis = new Lenis({
				wheelMultiplier: 0.8,
        duration: 2,        
			});
      
			window.lenis = lenis;
			function raf(time) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}

			requestAnimationFrame(raf);

      // Detect scrollbar dragging
      window.addEventListener("mousedown", (e) => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        // Check if the click is within the scrollbar area
        const isScrollbarClick = e.clientX >= window.innerWidth - scrollbarWidth;

        if (isScrollbarClick) {
          window.lenis.stop(); // Stop Lenis only if clicking the scrollbar
        }
      });
      
      window.addEventListener("mouseup", (e) => {
        window.lenis.start();
      });

 	 });

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
