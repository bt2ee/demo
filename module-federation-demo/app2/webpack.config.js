const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Mfp = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  // entry 入口，output出口，module模块，plugins 插件  mode工作模式，devServer开发服务器

  //  mode 工作模式
  mode: "development", // production  、 development、none

  // 入口
  entry: "./src/index.js",

  //  出口
  output: {
    filename: "./bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // 模块
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      }, ],
    }, ],
  },

  //  插件
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new Mfp({
      // 微应用(模块) 名称，当前模块自己的名字
      name: "app4",
      // 导入模块
      remotes: {
        // 导入后给模块起个别名："微应用名称@地址/导出的文件名"
        app3: "app3@http://localhost:3003/remoteEntry.js",
        app1: "app1@http://localhost:3000/remoteEntry.js",
      },
    })
  ],


  //  服务器
  devServer: {
    static: path.join(__dirname, "./dist"),
    port: 3002,
    open: true,
  },

  resolve: {
    extensions: [".js"],
  },
};