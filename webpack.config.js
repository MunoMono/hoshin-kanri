const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";
const BASE = "/hoshin-kanri/";

module.exports = {
  mode: isProd ? "production" : "development",
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].js",
    publicPath: BASE,               // <-- important for GH Pages
    clean: true,
  },
  devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
  devServer: {
    port: 5173,
    historyApiFallback: {
      index: BASE,                   // serve index at /hoshin-kanri/
    },
    static: {
      directory: path.join(__dirname, "public"),
      publicPath: BASE + "assets",   // static overlay (not required but ok)
      watch: true,
    },
    client: { overlay: true },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }], "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i,
        type: "asset",
        generator: { filename: "assets/[name][ext]" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      publicPath: BASE,              // ensure injected tags use /hoshin-kanri/
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
  ],
};