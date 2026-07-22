export default async function handler(req, res) {
  let NEXT_PUBLIC_WORDPRESS_API_URL;
  if (process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
    NEXT_PUBLIC_WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL.replace("graphql", "");
  } else {
    NEXT_PUBLIC_WORDPRESS_API_URL = "https://wp.bracketmedia.com/";
  }

  // http://localhost:3000/api/preview?redirect=sample-page

  try {
    const response = await fetch(NEXT_PUBLIC_WORDPRESS_API_URL + "wp-json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "bracketmedia",
        password: "Cuc4r4ch4!", // mover a env
      }),
    });

    console.log("response", response);

    if (!response.ok) throw new Error("Error de autenticación");

    const data = await response.json();
    res.setPreviewData(
      {
        token: data.token,
      },
      {
        maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
        path: req.query.redirect, // The preview mode cookies apply to paths with /about
      }
    );
    res.redirect(req.query.redirect);
    res.end();
  } catch (error) {
    throw error;
    res.end();
  }

}
