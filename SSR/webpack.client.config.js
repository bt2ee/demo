// ./webpack.client.config.js

const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sharedConfig = require('./webpack.shared.config.js');

const clientPort = 5000;

const config = {
  target: 'web',

  entry: './client/index.js',

  output: {
    path: path.join(__dirname, './build/client'),
    filename: 'scripts/bundle.js',
    publicPath: `http://127.0.0.1:${clientPort}/`,
  },

  devServer: {
    port: clientPort,
    liveReload: true,
    proxy: {
      '/*': {
        target: `http://127.0.0.1:${clientPort}/`,
        secure: false, // 设置支持https协议的代理
      }
    }
  },

  module: {
    rules: [{
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              exportLocalsConvention: 'camelCase',
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
        },
        'less-loader',
      ],
    }],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/bundle.css',
    }),
  ],
};

module.exports = merge(sharedConfig, config);