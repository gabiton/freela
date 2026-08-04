import { ProjectListItem } from "@/components/Parts/ProjectListItem";
import { useEffect, useRef, useState } from "react";

export const Projects = ({ data, style }) => {
  const projects = data.projects || [];
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const projectItems = [...projects, ...projects, ...projects];

  useEffect(() => {
    const updateActiveItem = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = null;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) {
          return;
        }

        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    updateActiveItem();
    window.addEventListener("scroll", updateActiveItem, { passive: true });
    window.addEventListener("resize", updateActiveItem);

    return () => {
      window.removeEventListener("scroll", updateActiveItem);
      window.removeEventListener("resize", updateActiveItem);
    };
  }, [projectItems.length]);

  if (!projects.length) {
    return null;
  }
  
  return (
    <div className={`Projects`} >
      <div className="container">

        {projectItems.map((project, index) => (
          <ProjectListItem
            active={activeIndex === index}
            key={`${project.ID || project.id || project.slug || project.post_name}-${index}`}
            project={project}
            ref={(item) => {
              itemRefs.current[index] = item;
            }}
          />
        ))}

      </div>
    </div>
  );
};
