const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  devtool: false,
  entry: './src/main.js',
  mode: "production",
  devServer: {
    port: 3003,
    contentBase: path.join(__dirname, "dist"),
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    }),
    new ModuleFederationPlugin({
      // 提供给其他服务加载的文件
      filename: "remoteEntry.js",
      // 唯一ID，用于标记当前服务
      name: "app3",
      library: { type: "var", name: "app3" },
      // 需要暴露的模块，使用时通过 `${name}/${expose}` 引入
      exposes: {
        './Header': "./src/Header.vue",
      }
    })
  ]
}