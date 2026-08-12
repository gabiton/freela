import Image from "next/image";
import { getVimeoEmbedUrl } from "utils/getVimeoEmbedUrl";

export const Media = ({ data }) => {
  const media = Array.isArray(data.media) ? data.media : [];
  
  return (
    <div className={`Media `} >
      <div className="container">
        {media.map((item, index) => {
          const vimeoEmbedUrl = getVimeoEmbedUrl(item.vimeo_url || item.vimeoUrl);

          return (
            <div className="col" key={`media-${index}`}>
            {vimeoEmbedUrl && (
              <div className="Media__video">
              <iframe
                src={vimeoEmbedUrl}
                title={`Media Vimeo video ${index + 1}`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
              </div>
            )}
            {!vimeoEmbedUrl && !item.video?.url && item.image?.url && (
              <Image
                src={item.image.url}
                width={item.image.width}
                height={item.image.height}
                alt={item.image.alt || ""}
              />
            )}
            {!vimeoEmbedUrl && item.video?.url && (
              <video src={item.video.url} autoPlay loop muted playsInline />
            )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
 
