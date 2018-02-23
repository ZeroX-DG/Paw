process.env.BABEL_ENV = 'main'
const path = require('path');
const webpack = require('webpack');
const BabiliWebpackPlugin = require('babili-webpack-plugin');

module.exports = {
  entry: {
    main: [
      path.resolve(__dirname, '..', 'src', 'main', 'main.js'),
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', 'compiled'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new BabiliWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false
  },
};
