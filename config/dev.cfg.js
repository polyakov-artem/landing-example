const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./base.cfg');


module.exports = merge(baseConfig, {
  devServer: {
    port: 3000,
    hot: true,
    inline: true,
  },
 
  target: 'web',
  mode: 'development',
  devtool: 'source-map',

  watchOptions: {
    ignored: /node_modules/
  },

  module: {
    rules: [{
      test: /\.(css|scss|sass)$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), 
  ],

});