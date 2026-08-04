import { ProjectListItem } from "@/components/Parts/ProjectListItem";

export const Projects = ({ data, style }) => {
  const projects = data.projects || [];

  if (!projects.length) {
    return null;
  }
  
  return (
    <div className={`Projects`} >
      <div className="container">

        {projects.map((project) => (
          <ProjectListItem
            key={project.ID || project.id || project.slug || project.post_name}
            project={project}
          />
        ))}
        {projects.map((project) => (
          <ProjectListItem
            key={project.ID || project.id || project.slug || project.post_name}
            project={project}
          />
        ))}
        {projects.map((project) => (
          <ProjectListItem
            key={project.ID || project.id || project.slug || project.post_name}
            project={project}
          />
        ))}

      </div>
    </div>
  );
};
