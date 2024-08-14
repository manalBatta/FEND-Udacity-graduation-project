const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    libraryTarget: "var",
    library: "Client",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/, // Corrected regex for JS files
        exclude: /node_modules/,
        use: "babel-loader", // Use instead of loader for clarity
      },
      {
        test: /\.scss$/, // Matches .scss files
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into files
          "css-loader", // Turns CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css", // Customize the filename pattern
    }),
    new WorkboxPlugin.GenerateSW(),
  ],
};
