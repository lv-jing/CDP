const CracoLessPlugin = require("craco-less");
const webpack = require("webpack");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");

process.env.CI = false;

module.exports = {
  webpack: {
    plugins: [new SimpleProgressWebpackPlugin()],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output={
        ...webpackConfig.output,
        ...{
          publicPath: process.env.REACT_APP_PREFIX
        }
      }
      return webpackConfig;
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
