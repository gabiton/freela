import Link from "next/link";
import { forwardRef, useEffect, useRef, useState } from "react";

const PROJECT_LIST_ITEM_CURTAIN_DURATION = 550;

const getProjectHref = (project) => {
    const slug = project?.slug || project?.post_name;

    return slug ? `/project/${slug}` : project?.post_url || "#";
};

export const ProjectListItem = forwardRef(({
    active = false,
    instant = false,
    linkActive = false,
    project,
    showLink = true,
    style,
    variant = "base",
}, ref) => {
    const curtainTimeoutRef = useRef(null);
    const [curtainState, setCurtainState] = useState("idle");

    useEffect(() => {
        if (curtainTimeoutRef.current) {
            clearTimeout(curtainTimeoutRef.current);
            curtainTimeoutRef.current = null;
        }

        if (instant) {
            setCurtainState(active ? "visible" : "idle");
            return;
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
    }, [active, instant]);

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
            className={`ProjectListItem ProjectListItem--${variant} is-curtain-${curtainState}${active ? " active" : ""}${linkActive ? " is-link-active" : ""}${instant ? " is-instant" : ""}`}
            ref={ref}
            style={style}
        >
            <h3>{project.post_title || project.title}</h3>
            {showLink && (
                <Link href={getProjectHref(project)} aria-label={project.post_title || project.title}></Link>
            )}
        </div>
    );
});

ProjectListItem.displayName = "ProjectListItem";
