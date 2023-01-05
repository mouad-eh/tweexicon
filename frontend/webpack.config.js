const HtmlWebpackPlugin = require('html-webpack-plugin');
// this plugin will inject the script tag in the bundled html file
const path = require('path');
// the path module is in node js
// it doesn't matter because this file will not run on the browser
// it will be used to create javascript bundle
// that bundle is deployed and used in the browser

module.exports = {
    entry: './index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
    },
    target: 'web',
    devServer: {
        port: '5000',
        static: {
            directory: path.join(__dirname, 'public')
        },
        open: true,
        hot: true,
        liveReload: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        })
        // this plugin is copying the html and css files to dist when building
    ]
};