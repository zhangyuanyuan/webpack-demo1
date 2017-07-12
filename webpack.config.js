var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于将css文件提取出来形成单独css文件
var ExtractWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/js/app.scss.js',
  output:{
    path: __dirname,//出口路径
    filename: 'dist/js/[name].bundle.js'//出口名称
  },
  module:{
    rules:[
          {
              test:/\.scss$/,
              use: ExtractWebpackPlugin.extract({
                fallback: 'style-loader',
                  use:[ 'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {plugins: [require('autoprefixer')]}            
                        },
                        'sass-loader'
                     ]
              })
          }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({}),
    new ExtractWebpackPlugin('dist/css/bundle.css')
  ]
}