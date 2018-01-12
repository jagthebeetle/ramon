const path = require('path');
const merge = require('webpack-merge');
const webpackCommon = require('../webpack.common');

const demo = {
    entry: './demo/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};

module.exports = merge(webpackCommon, demo);
