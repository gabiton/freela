import Image from "next/image";

export const Team = ({ data, style }) => {
  const team = Array.isArray(data.team) ? data.team : [];

  if (!data.block_title && !team.length) {
    return null;
  }

  return (
    <div className="Team">
      <div className="container">
        {data.block_title && (
          <h2 dangerouslySetInnerHTML={{ __html: data.block_title }} />
        )}

        <div className="Team__list">
          {team.map((member, index) => {
            const image = member.image;

            return (
              <div
                className="Team__item"
                key={`${member.name || "member"}-${index}`}
              >
                {member.name && <div className="name">{member.name}</div>}
                {member.position && (
                  <div className="position">{member.position}</div>
                )}
                {image?.url && (
                  <div className="image">
                    <Image
                      src={image.url}
                      width={image.width || 600}
                      height={image.height || 800}
                      alt={image.alt || member.name || ""}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
