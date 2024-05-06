const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    watchFiles: ["./src/index.html"], // looks for changes in the template html
  },
  optimization: {
    runtimeChunk: "single", // used when multiple entries
  },
});
