import { ProjectListItem } from "@/components/Parts/ProjectListItem";
import { useEffect, useRef, useState } from "react";

const PROJECTS_SCROLL_COOLDOWN = 650;
const PROJECTS_WHEEL_THRESHOLD = 20;
const PROJECTS_ITEM_DISTANCE = 110;

const wrapIndex = (index, length) => {
  if (!length) {
    return 0;
  }

  return ((index % length) + length) % length;
};

export const Projects = ({ data, style }) => {
  const projects = data.projects || [];
  const projectsRef = useRef(null);
  const scrollLockRef = useRef(false);
  const scrollLockTimeoutRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(projects.length);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    setActiveIndex(projects.length);
  }, [projects.length]);

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
  
  return (
    <div className={`Projects`} data-lenis-prevent-wheel ref={projectsRef}>
      <div
        className={`container${isJumping ? " is-jumping" : ""}`}
        onTransitionEnd={handleTransitionEnd}
        style={{
          "--projects-item-height": `${PROJECTS_ITEM_DISTANCE}px`,
          "--projects-offset": `${projectsOffset}px`,
        }}
      >

        {repeatedProjects.map((project, index) => (
          <ProjectListItem
            active={index === activeIndex}
            instant={isJumping}
            key={`${project.ID || project.id || project.slug || project.post_name}-${index}`}
            project={project}
          />
        ))}

      </div>
    </div>
  );
};
