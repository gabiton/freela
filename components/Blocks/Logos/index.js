import Image from "next/image";

export const Logos = ({ data, style }) => {
  /*
  Para usar las opciones de style de los bloques
  const blockStyle = style?.className?.includes('is-style-dark') ? 'dark' : 'light'; 
  */
  const logos = Array.isArray(data.logos) ? data.logos : [];

  if (!data.block_title && !logos.length) {
    return null;
  }

  return (
    <div className="Logos">
      <div className="container">
        {data.block_title && (
          <div className="block__top">
            <h2>{data.block_title}</h2>
          </div>
        )}

        <div className="Logos__grid">
          {logos.map((item, index) => {
            const logo = item.logo;

            return (
              <div
                className="Logos__item"
                key={`${item.title || "logo"}-${index}`}
              >
                {logo?.url && (
                  <Image
                    src={logo.url}
                    width={logo.width || 300}
                    height={logo.height || 160}
                    alt={logo.alt || item.title || ""}
                  />
                )}
                {item.title && <span>{item.title}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
