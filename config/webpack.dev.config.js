const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 公共配置
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
  mode: 'development', // 开发模式
  entry: path.join(__dirname, '../demo/index.tsx'), // 入口，处理资源文件的依赖关系
  output: {
    path: path.join(__dirname, '../demo/dist'),
    filename: 'dev.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.less$/,
        exclude: /.min.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'global',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /.min.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../demo/index.html'),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  devServer: {
    static: path.join(__dirname, '../demo/dist/'),
    compress: true,
    host: '127.0.0.1',
    port: 8686, // 启动端口
    open: true, // 打开浏览器
  },
};
module.exports = merge(devConfig, baseConfig); // 合并配置
