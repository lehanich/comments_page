const webpack = require("webpack");
const path = require('path');

module.exports = {
  entry: [
    "react", "react-dom" // "antd", "lodash", 
  ],
  mode: "development",
  devtool: false, // sourcemaps
  // sourcemap: false,
  output: {
    path: path.join(__dirname, "vendor"),
    filename: "vendor.[name].js",
    library: "[name]_[fullhash]"
  },
  
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "vendor", "[name]-manifest.json"),
      name: "[name]_[fullhash]"
    })
  ]
}
