import Image from "next/image";
import Link from "next/link";

const getProjectHref = (project) => {
    const slug = project?.slug || project?.post_name;

    return slug ? `/project/${slug}` : project?.post_url || "#";
};

export const ProjectListItem = ({ project }) => {
    const image = project?.featured_image || project?.featuredImage;

    if (!project) {
        return null;
    }

    return (
        <div className="ProjectListItem">
            <h3>{project.post_title || project.title}</h3>
            {image?.url && (
                <figure>
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
};
