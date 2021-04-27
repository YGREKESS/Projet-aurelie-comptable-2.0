const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode: mode,
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/index_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images",
          publicPath: "images",
        },
      },
    ],
  },

  plugins: [
    /*     new CleanWebpackPlugin(),
     */ new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devtool: "source-map",
  devServer: {
    contentBase: __dirname + "dist",
    watchContentBase: true,
    hot: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
};
