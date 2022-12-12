const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
/*const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');*/

module.exports = {
    // change to .tsx if necessary
    target: "web", //node
    plugins: [
        /*new webpack.HotModuleReplacementPlugin(),*/
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public' }
            ]
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: 'static' // can modify `static` to another name or get it from `process`
        })
        /*new HtmlWebpackPlugin()*/
    ],
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
    },
    devServer: {
        port: 3000,

        /*watchContentBase: true,*/
        /*hot: true,*/
        /*static: path.resolve(__dirname, 'dist')*/
        /*liveReload: true*/
        /*watchContentBase: tru,e
        contentBase : './src'*/
    },
    resolve: {
        // changed from extensions: [".js", ".jsx"]
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
            {
                test: /\.(t|j)sx?$/, use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }, exclude: /node_modules/
            },
            {
                test: /\.css?$/, use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
                exclude: /node_modules/
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
            }
            // addition - add source-map support
            /*{enforce: "pre", test: /\.js$/, exclude: /node_modules/}*/
        ]
    },
    // addition - add source-map support
    /*devtool: "source-map"*/
}