var join = require('path').join;
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


console.log(process.env.NODE_ENVn);
console.log(typeof process.env.NODE_ENV, 1111);
if (process.env.NODE_ENV  == 'prod') {
    publicPath = 'http://localhost:3000/public/'
} else {
    publicPath = 'http://localhost:8086/public/'
}

var babelQuery = {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-runtime', 'add-module-exports', 'transform-decorators-legacy'],
    cacheDirectory: true
};

const copyFile = {
    production: [
        {
            from: 'src/static/jquery-2.2.1.min.js', to: 'jquery.min.js'
        }, {
            from: 'src/static/antd-0.12.15.min.css', to: 'antd.min.css'

        }, {
            from: 'src/static/antd-0.12.15.min.js', to: 'antd.min.js'
        }
    ]
}

module.exports = {
    //页面入口文件配置
    entry: {
        index: './src/entry/Index.jsx'
    },
    //入口文件输出配置
    output: {
        path: '../node/public',
        publicPath: publicPath,
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css?sourceMap&-restructuring!' + 'postcss-loader')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: babelQuery,
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: babelQuery,
                //happy:   { id: 'babelJs' }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!' + 'postcss-loader!' + 'less?{"sourceMap":true,"modifyVars":{}}')
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        /*
         * 公共文件配置
         * */
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        /*
         * css单独打包成一个css文件
         * 比如entry.js引入了多个less，最终会都打到一个xxx.css中。
         * */
        new ExtractTextPlugin("[name].css", {
            disable: false,
            allChunks: true
        }),
        new CopyWebpackPlugin(
            copyFile.production
        ),
    ],
    //其它解决方案配置
    resolve: {
        root: [path.resolve('./src')],
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', './node_modules'],
    }
};