const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    useAxios: "./src/useAxios.ts",
    "useAxios.min": "./src/useAxios.ts",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "useAxios",
    libraryTarget: "umd",
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\min.js(\?.*)?$/i,
      }),
    ],
  },
  externals: ["axios", "react"],
};
