const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // デバッグ
  // web server
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true, // 404のときにindex.htmlを返す
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
