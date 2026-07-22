export function generateSiteMap(result) {
  if (!result || result.length == 0) return;

  // if onyl one item, build an array to use the same map
  if ( result.loc ) {
    let resultNew = [];
    resultNew['loc'] = result.loc;
    resultNew['lastmod'] = result.lastmod;
    result = { resultNew };
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${Object.keys(result)
        .map((i) => {
          return `
            <url>
		          <loc>${result[i].loc}</loc>
		          <lastmod>${result[i].lastmod}</lastmod>
	          </url>`;
        })
        .join("")}
   </urlset>
 `;
}
 
function SiteMap(props) {}

export async function sitemapGetServerSideProps( { res, resolvedUrl } ) {
  // We make an API call to gather the URLs for our site
  const query = `
            query {
                 yoastSitemapData(sitemapType: "${resolvedUrl}")
            } 
        `;
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const result = await response.json();
  const sitemap = generateSiteMap(result.data.yoastSitemapData.url);
  
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  
  res.end();

  return {
    props: {},
  };
  
}

export default SiteMap;
