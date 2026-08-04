import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NEXT_PROJECT_HOVER_MAX_OFFSET = 50;
const NEXT_PROJECT_CURTAIN_DURATION = 550;

export const NextProject = ({ project }) => {
	const nextProjectRef = useRef(null);
	const nextProjectCurtainTimeoutRef = useRef(null);
	const [nextProjectCurtainState, setNextProjectCurtainState] = useState("idle");

	const nextProjectHref = project?.post_name
		? `/project/${project.post_name}`
		: project?.post_url;
	const nextProjectImage = project?.featured_image;
	const nextProjectYear = project?.year ? String(project.year).trim() : "";

	const handleMouseMove = (event) => {
		const nextProject = nextProjectRef.current;

		if (!nextProject) {
			return;
		}

		const rect = nextProject.getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
		const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
		const offsetX = Math.max(-1, Math.min(1, x)) * NEXT_PROJECT_HOVER_MAX_OFFSET;
		const offsetY = Math.max(-1, Math.min(1, y)) * NEXT_PROJECT_HOVER_MAX_OFFSET;

		nextProject.style.setProperty("--next-project-x", `${offsetX}px`);
		nextProject.style.setProperty("--next-project-y", `${offsetY}px`);
	};

	const resetMousePosition = () => {
		const nextProject = nextProjectRef.current;

		if (!nextProject) {
			return;
		}

		nextProject.style.setProperty("--next-project-x", "0px");
		nextProject.style.setProperty("--next-project-y", "0px");
	};

	const handleMouseEnter = () => {
		if (nextProjectCurtainTimeoutRef.current) {
			clearTimeout(nextProjectCurtainTimeoutRef.current);
		}

		setNextProjectCurtainState("visible");
	};

	const handleMouseLeave = () => {
		resetMousePosition();
		setNextProjectCurtainState("leaving");

		if (nextProjectCurtainTimeoutRef.current) {
			clearTimeout(nextProjectCurtainTimeoutRef.current);
		}

		nextProjectCurtainTimeoutRef.current = setTimeout(() => {
			setNextProjectCurtainState("idle");
		}, NEXT_PROJECT_CURTAIN_DURATION);
	};

	useEffect(() => {
		return () => {
			if (nextProjectCurtainTimeoutRef.current) {
				clearTimeout(nextProjectCurtainTimeoutRef.current);
			}
		};
	}, []);

	if (!project || !nextProjectHref) {
		return null;
	}

	return (
		<div
			className={`nextProject is-curtain-${nextProjectCurtainState}`}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			ref={nextProjectRef}
		>
			<div className="container">
				<div className="label">next Project</div>
				<h2>{project.post_title}</h2>
				<div className="year">
					{nextProjectYear && <>&copy;{nextProjectYear}</>}
				</div>
				{nextProjectImage?.url && (
					<figure className={`is-${nextProjectCurtainState}`}>
						<Image
							src={nextProjectImage.url}
							alt={nextProjectImage.alt || ""}
							width={nextProjectImage.width || 246}
							height={nextProjectImage.height || 308}
						/>
					</figure>
				)}
			</div>
			<Link
				aria-label={`Next project: ${project.post_title}`}
				href={nextProjectHref}
				title={project.post_title}
			></Link>
		</div>
	);
};
