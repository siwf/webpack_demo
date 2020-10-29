`use strict`;
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name][chunkhash:8].js'
  },
  module: {
    rules: [
      { test: /.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // { test: /.(png|jpg|gif|jpeg)$/, use: 'file-loader' },
      // url-loader production 模式下会把图片插入到js中
      { test: /\.(png|svg|jpg|gif)$/, use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:7].[ext]',
            limit: 10240 // 10kb 图片小于10kbase64
          }
        }
      ] },
      { test: /.(woff|woff2|eot|ttf|otf)$/, use: 'url-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // 服务的基础目录
    contentBase: './dist',
    hot: true
  }
}