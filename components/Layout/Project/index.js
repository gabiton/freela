import { BlockRenderer } from "components/BlockRenderer";
import { Header } from "components/Layout/Header";
import { Footer } from "components/Layout/Footer";

import { PageWrapper } from "context/page";
import Head from "next/head";
import { useRouter } from "next/router";

import { useCallback, useEffect, useRef, useState } from "react";
import TagManager from "react-gtm-module";

const NEXT_SCROLL_DISTANCE = 800;
const NEXT_SCROLL_RESET_DELAY = 350;
const NEXT_SCROLL_REDIRECT_DELAY = 450;

const getProjectPath = (url) => {
	if (!url) {
		return null;
	}

	let pathname = String(url).trim();

	try {
		pathname = new URL(pathname).pathname;
	} catch (error) {
		pathname = pathname.replace(/^\/+/, "");
	}

	const slug = pathname
		.replace(/^\/+|\/+$/g, "")
		.replace(/^project\/?/, "");

	return slug ? `/project/${slug}` : null;
};

export const Project = (props) => {
	const router = useRouter();
	const projectNextRef = useRef(null);
	const nextProjectTimeoutRef = useRef(null);
	const resetProgressRef = useRef(null);
	const scrollProgressRef = useRef(0);
	const isChangingProjectRef = useRef(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	console.log("PAGE PROPS: ", props);

	const resetProjectNextProgress = useCallback(() => {
		if (nextProjectTimeoutRef.current) {
			clearTimeout(nextProjectTimeoutRef.current);
			nextProjectTimeoutRef.current = null;
		}

		if (resetProgressRef.current) {
			clearTimeout(resetProgressRef.current);
			resetProgressRef.current = null;
		}

		isChangingProjectRef.current = false;
		scrollProgressRef.current = 0;
		setScrollProgress(0);
	}, []);

	useEffect(() => {
		if (process.env.TAG_MANAGER_ID) {
			const tagManagerArgs = {
				gtmId: process.env.TAG_MANAGER_ID,
			};
			TagManager.initialize(tagManagerArgs);
		}
	}, []);

	useEffect(() => {
		const handleWheel = (event) => {
			const nextPath = getProjectPath(props.postData?.related?.post_name);


			if (!nextPath || event.deltaY <= 0) {
				return;
			}

			if (isChangingProjectRef.current) {
				event.preventDefault();
				return;
			}

			const projectNext = projectNextRef.current;

			if (!projectNext) {
				return;
			}

			const projectNextBottom = projectNext?.getBoundingClientRect().bottom ?? 0;
			const scrollBottom = projectNextBottom <= window.innerHeight + 1;

			if (!scrollBottom) {
				return;
			}

			event.preventDefault();

			const nextProgress = Math.min(
				NEXT_SCROLL_DISTANCE,
				scrollProgressRef.current + event.deltaY
			);

			scrollProgressRef.current = nextProgress;
			setScrollProgress(nextProgress);

			if (resetProgressRef.current) {
				clearTimeout(resetProgressRef.current);
			}

			if (nextProgress >= NEXT_SCROLL_DISTANCE) {
				isChangingProjectRef.current = true;
				nextProjectTimeoutRef.current = setTimeout(() => {
					router.push(nextPath);
				}, NEXT_SCROLL_REDIRECT_DELAY);
				return;
			}

			resetProgressRef.current = setTimeout(resetProjectNextProgress, NEXT_SCROLL_RESET_DELAY);
		};

		window.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			window.removeEventListener("wheel", handleWheel);

			if (resetProgressRef.current) {
				clearTimeout(resetProgressRef.current);
			}

			if (nextProjectTimeoutRef.current) {
				clearTimeout(nextProjectTimeoutRef.current);
			}
		};
	}, [props.postData?.related?.post_name, resetProjectNextProgress, router]);

	useEffect(() => {
		resetProjectNextProgress();
	}, [resetProjectNextProgress, router.asPath]);

	const projectNextProgress = (scrollProgress / NEXT_SCROLL_DISTANCE) * 100;

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
				<div className="cat">motorcycles</div>
			</div>

			{props.postData.hero_video && <video src={props.postData.hero_video.url} autoPlay muted loop />}
		</div>

		<BlockRenderer pageBlocks={props.blocks} />

		{props.postData.related.post_title && 
		<div
			className="projectNext"
			data-url={props.postData.related.post_name}
			ref={projectNextRef}
			style={{ "--p": projectNextProgress }}
		>
			<div className="container">		
				<div className="projectNext__flex">
					<span>NEXT Project</span>
					<h3>
						{props.postData.related.post_title}
					</h3>
					<span>(  KEEP SCROLLING  )</span>
				</div>
				<div className="projectNext__bar"></div>		
			</div>			
		</div>
		}


		<Footer />
		</PageWrapper>
	);
};
