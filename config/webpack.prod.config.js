const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共的配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 用于将组件的css打包成单独的文件输出到`lib`目录中
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prodConfig = {
  mode: 'production', // 生产模式
  entry: path.join(__dirname, '../src/index.ts'),
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'index.js',
    libraryTarget: 'umd', // 采用通用模块定义
    libraryExport: 'default', // 兼容 ES6 Module、CommonJS 和 AMD 模块规范
  },
  module: {
    rules: [
      {
        test: /.less$/,
        exclude: /.min.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/index.css', // 提取后的css的文件名
    }),
    new CleanWebpackPlugin(),
  ],
  externals: {
    // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
};
module.exports = merge(prodConfig, baseConfig); // 合并配置
