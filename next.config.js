if (!process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

const {webpack} = require("next/dist/compiled/webpack/webpack");


/** @type {import('next').NextConfig} */
module.exports = { 
  env: {
    NEXT_PUBLIC_WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
    TAG_MANAGER_ID: process.env.TAG_MANAGER_ID,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          // fixes proxy-agent dependencies
          net: false,
          dns: false,
          tls: false,
          assert: false,
          // fixes next-i18next dependencies
          path: false,
          fs: false,
          // fixes mapbox dependencies
          events: false,
          // fixes sentry dependencies
          process: false,
        },
      };
    }

    config.experiments = { ...config.experiments, topLevelAwait: true }
    
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",

          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      collapseGroups: false,
                      cleanupIds: false,
                      convertTransform: false,
                      convertPathData: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
      "secure.gravatar.com",
      "bracketmedia.com",
      "palermo-headless.local",
    ],
  },
};
