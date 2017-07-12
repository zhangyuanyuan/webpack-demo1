var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output:{
    path: __dirname,//出口路径
    filename: 'dist/js/[name].bundle.js'//出口名称
  },
  module:{
    rules:[
          {
              test:/\.css$/,
              use:[ 'style-loader', 
                {loader:'css-loader', 
                options: {
                  importLoaders:1
                }
              }, {
                        loader: 'postcss-loader',
                        options: {plugins: [require('postcss-import'), require('autoprefixer')]}            
                    }]
          }
      ],
      loaders:[{
          test:/\.js$/,
          exclude: /node_modules/,
          include: /\.\/src/,
          use:{
              loader:'babel-loader',
              options:{
                  presets: ['env']
              }
          }
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({})
  ]
}