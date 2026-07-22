function generateSiteMap(result) {
  if (!result || result.length == 0) return;

  return `<?xml version="1.0" encoding="UTF-8"?>
   <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${result
        .map((i) => {
          return `
            <sitemap>
		          <loc>${i.loc}</loc>
		          <lastmod>${i.lastmod}</lastmod>
	          </sitemap>`;
        })
        .join("")}
   </sitemapindex>
 `;
}

function SiteMap(props) {}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const query = `
            query {
                 yoastSitemapData(sitemapType: "/sitemap_index.xml")
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

  console.log("result",result);
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(result.data.yoastSitemapData.sitemap);
  //let sitemap = ""

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
