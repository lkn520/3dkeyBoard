/**
 * Created by Chelly on 2018/5/28.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin('stylesheets/[name].css');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path:   path.resolve(__dirname, 'dist'),
        filename: 'js/main.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader', options: { importLoaders: 1}
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        open: true,
        port: 9000
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            keyboards: [
                {
                    key: '1'
                }
            ]
        })
    ]
}