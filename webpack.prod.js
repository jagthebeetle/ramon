const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common');

const prod = {
    entry: './src/index.ts',
    output: {
        filename: 'ramon.js',
        libraryTarget: 'umd',
        library: 'ramon',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new UglifyJsPlugin(),
    ],
};

module.exports = merge(webpackCommon, prod);
