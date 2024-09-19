const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        alias: {
          ...webpackConfig.resolve.alias,
          "react-refresh/runtime": path.resolve(
            __dirname,
            "node_modules/react-refresh/runtime.js",
          ),
        },
      };

      return webpackConfig;
    },
  },
};
