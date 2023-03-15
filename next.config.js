const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

const nextConfig = {
  target: process.env.NEXT_TARGET || "serverless",
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /[.](png|jpg|ico|css)/,
        handler: "CacheFirst",
        options: {
          cacheName: "assets-cache",
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: "/*",
        handler: "NetworkFirst",
        options: {
          cacheableResponse: {
            statuses: [0, 200],
            method: "GET",
            headers: {
              "x-test": "true",
            },
          },
        },
      },
    ],
  },
};

module.exports = withCSS(
  withSass({
    webpack5: false,
    nextConfig,
    webpack(config) {
      if (config.optimization.splitChunks) {
        config.optimization.splitChunks.cacheGroups.shared = {
          name: "app-other", // this needs to be a value that is different from what the other chunks in your app are using
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        };
      }
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
          },
        },
      });
      return config;
    },
  })
);
