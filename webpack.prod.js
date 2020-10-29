`use strict`;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js',
    search: './src/search.js'
  },
  output: {
    publicPath: './',
    path: path.join(__dirname, 'dist'),
    // js文件指纹
    filename: '[name]_[chunkhash:8].js'
  },
  module: {
    rules: [{
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        // style-loader 是把样式插入
        // MiniCssExtractPlugin是吧样式提取，和style-laoder互斥
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      // { test: /.(png|jpg|gif|jpeg)$/, use: 'file-loader' },
      // url-loader production 模式下会把图片插入到js中
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          // loader: 'url-loader',
          loader: 'file-loader',
          options: {
            // 图片文件指纹
            name: '[name]_[hash:8].[ext]',
            limit: 10240 // 10kb 图片小于10kbase64
          }
        }]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // 字体文件指纹
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
        
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['app'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/search.html'),
      filename: 'search.html',
      chunks: ['search'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new CleanWebpackPlugin()
  ]
}