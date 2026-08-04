import Image from "next/image";
import Link from "next/link";
import { forwardRef, useEffect, useRef, useState } from "react";

const PROJECT_LIST_ITEM_CURTAIN_DURATION = 550;

const getProjectHref = (project) => {
    const slug = project?.slug || project?.post_name;

    return slug ? `/project/${slug}` : project?.post_url || "#";
};

export const ProjectListItem = forwardRef(({ active = false, project }, ref) => {
    const curtainTimeoutRef = useRef(null);
    const [curtainState, setCurtainState] = useState("idle");
    const image = project?.featured_image || project?.featuredImage;

    useEffect(() => {
        if (curtainTimeoutRef.current) {
            clearTimeout(curtainTimeoutRef.current);
            curtainTimeoutRef.current = null;
        }

        if (active) {
            setCurtainState("visible");
            return;
        }

        setCurtainState((currentState) => {
            if (currentState === "idle") {
                return "idle";
            }

            curtainTimeoutRef.current = setTimeout(() => {
                setCurtainState("idle");
            }, PROJECT_LIST_ITEM_CURTAIN_DURATION);

            return "leaving";
        });
    }, [active]);

    useEffect(() => {
        return () => {
            if (curtainTimeoutRef.current) {
                clearTimeout(curtainTimeoutRef.current);
            }
        };
    }, []);

    if (!project) {
        return null;
    }

    return (
        <div
            className={`ProjectListItem is-curtain-${curtainState}${active ? " active" : ""}`}
            ref={ref}
        >
            <h3>{project.post_title || project.title}</h3>
            {image?.url && (
                <figure className={`is-${curtainState}`}>
                    <Image
                        src={image.url}
                        width={image.width || 800}
                        height={image.height || 600}
                        alt={image.alt || project.post_title || project.title || ""}
                    />
                </figure>
            )}
          <Link href={getProjectHref(project)} aria-label={project.post_title || project.title}></Link>
        </div>
    );
});

ProjectListItem.displayName = "ProjectListItem";
