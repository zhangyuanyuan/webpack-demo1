var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry : './entry.js',
	output : {
		path : __dirname,
		filename : 'js/[id]-[name]-[hash].js'
	},
	module: {
		rules: [
			{test: /\.css$/, use: ['style-loader', 'css-loader'] }
		],
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}}
		]
	},
	plugins: [
		new webpack.BannerPlugin('This file is created by quanquan'),
		new HtmlWebpackPlugin({
			inject: 'head',
			title: 'match',//生成的html文件的标题为'match', 若是指定模版则title不生效
      		filename: 'index-[hash].html',//生成的html文件名称为'index.html'
      		favicon: './image/favicon.ico',
      		minify: {
      			removeComments: true, //去除注释
      			collapseWhitespace: true //去除间隙
      		},
      		template: 'ejs-compiled-loader!template/template.html',
      		dateData: new Date() // 可以通过htmlWebpackPlugin.options.dateData在template中得到
		})
	]
}