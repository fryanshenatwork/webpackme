const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const _path = {
  main: path.resolve(__dirname, '../'),
  build: path.resolve(__dirname, '../build/'),
  dist: path.resolve(__dirname, '../dist/'),
  src: path.resolve(__dirname, '../src/')
}

const baseWebpackConfig = {
  context: _path.main,
  entry: {
    main: [
      './src/js/main.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          },
          { loader: "eslint-loader" },
          { loader: "prettier-loader" }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'production' ? '[name].[hash].css' : 'bundle.css'
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jquery': 'jquery',
      'jQuery': 'jquery',
      'Popper': 'popper.js',
      'popper.js': 'popper.js'
    })
  ],
  output: {
    path: _path.dist,
    filename: process.env.NODE_ENV === 'production' ? '[name].[hash].js' : 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': _path.src
    }
  }
}

module.exports = { baseWebpackConfig, _path }
