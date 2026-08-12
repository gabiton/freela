export const getVimeoEmbedUrl = (url) => {
  if (!url) {
    return null;
  }

  const videoId = String(url).match(
    /(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/,
  )?.[1];

  if (!videoId) {
    return null;
  }

  return `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&muted=1&loop=1&autopause=0`;
};
