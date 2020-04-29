const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin');

const _path = {
  main: path.resolve(__dirname, '../'),
  build: path.resolve(__dirname, '../build/'),
  dist: path.resolve(__dirname, '../dist/'),
  src: path.resolve(__dirname, '../src/'),
  buildAssets: 'assets/'
}

const baseWebpackConfig = {
  context: _path.main,
  entry: {
    main: [
      './src/main.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          },
          {
            loader: 'eslint-loader',
            options: { fix: true }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'production'
        ? _path.buildAssets + '[name].[hash].css'
        : _path.buildAssets + 'bundle.css'
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jquery': 'jquery',
      'jQuery': 'jquery',
      'Popper': 'popper.js',
      'popper.js': 'popper.js'
    }),
    new HtmlWebpackPlugin({
      template: `${_path.src}/public/index.html`
    }),
    new StylelintPlugin({
      fix: true
    })
  ],
  output: {
    path: _path.dist,
    filename: process.env.NODE_ENV === 'production'
      ? _path.buildAssets + '[name].[hash].js'
      : _path.buildAssets + 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': _path.src
    }
  }
}

module.exports = { baseWebpackConfig, _path }
