// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: path.resolve(__dirname, "src/main.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].js",
    publicPath: "/",               // ← serve from /
    clean: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "sass-loader",
        ],
      },
      { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: "asset/resource" },
      { test: /\.(woff2?|ttf|eot)$/, type: "asset/resource" },
    ],
  },
  resolve: { extensions: [".js", ".jsx"] },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
  ],
  devServer: {
    port: 5173,
    open: true,                    // ← auto-open browser
    historyApiFallback: true,      // ← SPA routing
    static: path.resolve(__dirname, "public"), // ← serves /data/*
    hot: true,
  },
};