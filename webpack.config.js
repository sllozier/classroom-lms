const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname + "/public"),
    filename: "bundle.js",
  },
  context: __dirname,
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname + "/public"),
    },
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
};
