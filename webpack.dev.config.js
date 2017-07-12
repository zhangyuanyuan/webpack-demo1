var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app.js',//入口文件
    output:{
        path: __dirname,//出口路径
        filename: 'js/[name].bundle.js'//出口名称
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                     use:[ 
                             'css-loader',
                            {
                                loader: 'postcss-loader',
                                //自动添加前缀
                                options: {plugins: [require('autoprefixer')]}            
                            },
                            'sass-loader'
                        ]
                })              
            },
            {
                test:/\.js$/,
                include:/\.\/src/,
                use:{
                        loader: 'babel-loader',
                        //将最新标准的js代码翻译为es5代码
                        options:{presets: ['env']}
                    }
            },
            {
                test:/\.(png|jpg|gif|svg)$/i,
                use:[
                        //当图片大小大于1000byte时，以[name]-[hash:5].[ext]的形式输出
                        //当图片大小小于1000byte时，以baseURL的形式输出
                        'url-loader?limit=1000&name=[name]-[hash:5].[ext]',
                        //压缩图片
                        'image-webpack-loader'
                    ]
            }
          ]
    },
    plugins: [
          //使用模板生成html文件
        new HtmlWebpackPlugin({template:'ejs-compiled-loader!template/template.html'}),
        //分离出css到style.css
        new ExtractTextPlugin("style.css")
    ]
}