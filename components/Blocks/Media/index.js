import Image from "next/image";

export const Media = ({ data }) => {
  const media = Array.isArray(data.media) ? data.media : [];
  
  return (
    <div className={`Media `} >
      <div className="container">
        {media.map((item, index) => (
          <div className="col" key={`media-${index}`}>
            {item.image?.url && (
              <Image
                src={item.image.url}
                width={item.image.width}
                height={item.image.height}
                alt={item.image.alt || ""}
              />
            )}
            {item.video?.url && (
              <video src={item.video.url} autoPlay loop muted playsInline />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
 
