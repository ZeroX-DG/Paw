process.env.BABEL_ENV = 'web'
const path = require('path');
const webpack = require('webpack');
const { APP } = require('../src/config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
const BabiliWebpackPlugin = require('babili-webpack-plugin');

module.exports = {
  entry: {
    renderer: [
      path.resolve(__dirname, '..', 'src', 'renderer', 'main.js'),
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', 'compiled'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, '..', 'src/renderer')
      },
      {
        test: /\.(ttf|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[hash].[ext]'
        },
        include: path.resolve(__dirname, '..', 'src/renderer')
      }
    ]
  },
  plugins: [
    new BabiliWebpackPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new NodeTargetPlugin(),
    new HtmlWebpackPlugin({
      title: 'Paw',
      template: path.resolve(__dirname, '..', 'src/renderer/index.html'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      nodeModules: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '..', 'src/static'),
        to: path.join(__dirname, '..', 'compiled/static'),
        ignore: ['.*']
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  target: 'electron-renderer',
  node: {
    __dirname: false,
    __filename: false
  },
};
