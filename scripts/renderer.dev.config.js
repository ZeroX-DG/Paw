let path = require('path');
let webpack = require('webpack');
let { APP } = require('../src/config');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    renderer: [
      'react-hot-loader/patch',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:' + APP.port,
      path.resolve(__dirname, '..', 'src', 'renderer', 'main.js'),
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'app.js'
  },
  watch: true,
  target: 'electron-renderer',
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
        include: path.resolve(__dirname, '..', 'src/renderer')
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      hot: true,
      title: 'Paw',
      template: path.resolve(__dirname, '..', 'src/renderer/index.html')
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '..', 'src/static'),
        to: path.join(__dirname, '..', 'dist/static'),
        ignore: ['.*']
      }
    ]),
  ],
  node: {
    __dirname: true
  }
};
