import Image from "next/image";
import Link from "next/link";

const getProjectHref = (work) => {
  const slug = work?.post_name || work?.slug;

  return slug ? `/project/${slug}` : "#";
};

export const SelectedWork = ({ data, style }) => {
  const selectedWork = data.selected_work || data.selectedWork || [];

  if (!selectedWork.length) {
    return null;
  }
  console.log(data)

  return (
    <div className="SelectedWork">
      <div className="container">
        <div className="block__top">
          <h2>SELECTED WORK</h2>
          <Link className="textlink" href="/project"><span>View All</span></Link>
        </div>

        <div className="SelectedWork__grid">
          {selectedWork.map((work) => {
            const image = work.featured_image || work.featuredImage;

            return (
              <Link
                className="SelectedWork__item"
                href={getProjectHref(work)}
                key={work.ID || work.id || work.post_name}
              >
                {image?.url && (
                  <Image
                    src={image.url}
                    width={image.width || 800}
                    height={image.height || 600}
                    alt={image.alt || work.post_title || ""}
                  />
                )}
                <div className="SelectedWork__item__content">
                  <h3>{work.post_title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
