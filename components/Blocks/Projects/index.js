import { ProjectListItem } from "@/components/Parts/ProjectListItem";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const PROJECTS_SCROLL_COOLDOWN = 650;
const PROJECTS_WHEEL_THRESHOLD = 20;
const PROJECTS_ITEM_DISTANCE = 110;
const PROJECTS_IMAGE_CURTAIN_DURATION = 550;
const PROJECTS_IMAGE_HOVER_MAX_OFFSET = 50;

const wrapIndex = (index, length) => {
  if (!length) {
    return 0;
  }

  return ((index % length) + length) % length;
};

export const Projects = ({ data, style }) => {
  const projects = useMemo(() => data.projects || [], [data.projects]);
  const projectsRef = useRef(null);
  const scrollLockRef = useRef(false);
  const scrollLockTimeoutRef = useRef(null);
  const imageCurtainTimeoutRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(projects.length);
  const [currentImage, setCurrentImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [imageCurtainState, setImageCurtainState] = useState("idle");
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    setActiveIndex(projects.length);
  }, [projects.length]);

  useEffect(() => {
    return () => {
      if (imageCurtainTimeoutRef.current) {
        clearTimeout(imageCurtainTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const activeProject = projects[wrapIndex(activeIndex, projects.length)];
    const nextImage = activeProject?.featured_image || activeProject?.featuredImage || null;

    if (imageCurtainTimeoutRef.current) {
      clearTimeout(imageCurtainTimeoutRef.current);
      imageCurtainTimeoutRef.current = null;
    }

    if (!nextImage?.url) {
      setPreviousImage(null);
      setCurrentImage(null);
      setImageCurtainState("idle");
      return;
    }

    setCurrentImage((current) => {
      if (!current?.url) {
        setPreviousImage(null);
        setImageCurtainState("idle");
        return nextImage;
      }

      if (current.url === nextImage.url) {
        return current;
      }

      setPreviousImage(current);
      setImageCurtainState("entering");

      imageCurtainTimeoutRef.current = setTimeout(() => {
        setPreviousImage(null);
        setImageCurtainState("idle");
      }, PROJECTS_IMAGE_CURTAIN_DURATION);

      return nextImage;
    });
  }, [activeIndex, projects]);

  useEffect(() => {
    const projectsEl = projectsRef.current;

    if (!projectsEl || projects.length <= 1) {
      return;
    }

    const unlockScroll = () => {
      scrollLockRef.current = false;
    };

    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (Math.abs(event.deltaY) < PROJECTS_WHEEL_THRESHOLD || scrollLockRef.current) {
        return;
      }

      scrollLockRef.current = true;

      setActiveIndex((currentIndex) => currentIndex + (event.deltaY > 0 ? 1 : -1));

      if (scrollLockTimeoutRef.current) {
        clearTimeout(scrollLockTimeoutRef.current);
      }

      scrollLockTimeoutRef.current = setTimeout(unlockScroll, PROJECTS_SCROLL_COOLDOWN);
    };

    projectsEl.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      projectsEl.removeEventListener("wheel", handleWheel);

      if (scrollLockTimeoutRef.current) {
        clearTimeout(scrollLockTimeoutRef.current);
      }

      if (imageCurtainTimeoutRef.current) {
        clearTimeout(imageCurtainTimeoutRef.current);
      }
    };
  }, [projects.length]);

  if (!projects.length) {
    return null;
  }

  const repeatedProjects = [...projects, ...projects, ...projects];
  const activeProjectIndex = wrapIndex(activeIndex, projects.length);
  const projectsOffset = activeIndex * PROJECTS_ITEM_DISTANCE + PROJECTS_ITEM_DISTANCE / 2;

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || projects.length <= 1) {
      return;
    }

    if (activeIndex < projects.length || activeIndex >= projects.length * 2) {
      setIsJumping(true);
      setActiveIndex(projects.length + activeProjectIndex);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
    }
  };

  const listStyle = {
    "--projects-item-height": `${PROJECTS_ITEM_DISTANCE}px`,
    "--projects-offset": `${projectsOffset}px`,
  };

  const renderProjectItems = ({ overlay = false } = {}) =>
    repeatedProjects.map((project, index) => (
      <ProjectListItem
        active={overlay && index === activeIndex}
        instant={isJumping}
        key={`${overlay ? "overlay" : "base"}-${project.ID || project.id || project.slug || project.post_name}-${index}`}
        linkActive={!overlay && index === activeIndex}
        project={project}
        showLink={!overlay}
        variant={overlay ? "overlay" : "base"}
      />
    ));

  const handleMouseMove = (event) => {
    const projectsEl = projectsRef.current;

    if (!projectsEl) {
      return;
    }

    const rect = projectsEl.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    const offsetX = Math.max(-1, Math.min(1, x)) * PROJECTS_IMAGE_HOVER_MAX_OFFSET;
    const offsetY = Math.max(-1, Math.min(1, y)) * PROJECTS_IMAGE_HOVER_MAX_OFFSET;

    projectsEl.style.setProperty("--projects-image-x", `${offsetX}px`);
    projectsEl.style.setProperty("--projects-image-y", `${offsetY}px`);
  };

  const resetMousePosition = () => {
    const projectsEl = projectsRef.current;

    if (!projectsEl) {
      return;
    }

    projectsEl.style.setProperty("--projects-image-x", "0px");
    projectsEl.style.setProperty("--projects-image-y", "0px");
  };
  
  return (
    <div
      className={`Projects`}
      data-lenis-prevent-wheel
      onMouseLeave={resetMousePosition}
      onMouseMove={handleMouseMove}
      ref={projectsRef}
    >
      <div
        className={`Projects__list Projects__list--base${isJumping ? " is-jumping" : ""}`}
        onTransitionEnd={handleTransitionEnd}
        style={listStyle}
      >
        {renderProjectItems()}
      </div>

      {currentImage?.url && (
        <figure className={`Projects__figureStage is-${imageCurtainState}`}>
          {previousImage?.url && (
            <Image
              className="Projects__figureStage__image is-previous"
              src={previousImage.url}
              width={previousImage.width || 800}
              height={previousImage.height || 600}
              alt={previousImage.alt || ""}
            />
          )}
          <Image
            className="Projects__figureStage__image is-current"
            src={currentImage.url}
            width={currentImage.width || 800}
            height={currentImage.height || 600}
            alt={currentImage.alt || ""}
          />
        </figure>
      )}

      <div
        className={`Projects__list Projects__list--overlay${isJumping ? " is-jumping" : ""}`}
        style={listStyle}
      >
        {renderProjectItems({ overlay: true })}
      </div>
    </div>
  );
};
