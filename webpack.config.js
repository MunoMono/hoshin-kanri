const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5173;
const PUBLIC_PATH = "/hoshin-kanri/"; // where the site lives on GitHub Pages

module.exports = {
  mode: isProd ? "production" : "development",
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].js",
    publicPath: PUBLIC_PATH, // ensures script/css URLs are /hoshin-kanri/...
    clean: true,
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
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff2?|ttf|eot|otf)$/,
        type: "asset/resource",
        generator: { filename: "assets/[name][ext]" },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset/resource",
        generator: { filename: "assets/img/[name][ext]" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
    // 👇 copy everything from public/ (includes data/ + .nojekyll)
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
  devServer: {
    static: { directory: path.join(__dirname, "public") },
    port: PORT,
    historyApiFallback: { index: PUBLIC_PATH },
    open: false,
    client: { overlay: true },
  },
  devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
};