import { BlockRenderer } from "components/BlockRenderer";
import { Header } from "components/Layout/Header";
import { Footer } from "components/Layout/Footer";

import { PageWrapper } from "context/page";
import Head from "next/head";

import { useEffect } from "react";
import TagManager from "react-gtm-module";

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
	console.log(props.postData)

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
				<h1>
					{props.title}
				</h1>
				<div className="cat">
					{props.postData.year && <>
					&copy; {props.postData.year}
					</>
				}
				</div>
			</div>

			{props.postData.hero_video && <video src={props.postData.hero_video.url} autoPlay muted loop />}
		</div>

		<BlockRenderer pageBlocks={props.blocks} />

		<div className="nextProject">
			<div className="container">
			<div className="label">next Project</div>
			<h2>
			MV AGUSTA
			</h2>
			<div className="year">
				&copy;2026
			</div>
			<figure>
				<img src="https://placeholders.io/400/300" />
			</figure>
			</div>
		</div>

		<BlockRenderer pageBlocks={props.footerBlocks} />

		<Footer />
		</PageWrapper>
	);
};
