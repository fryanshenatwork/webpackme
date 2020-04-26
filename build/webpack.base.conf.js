const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')


const _path = {
  main: path.resolve(__dirname, '../'),
  build: path.resolve(__dirname, '../build/'),
  dist: path.resolve(__dirname, '../dist/'),
  src: path.resolve(__dirname, '../src/')
}

const baseWebpackConfig = {
  mode: 'production',
  context: path.join(__dirname, '../'),
  entry: {
    main: [
      './src/scss/main.scss',
      './src/js/main.js'
    ]
  },
  module: {
    rules: [{
      test: /\.(scss|sass)$/,
      use: [
        'css-hot-loader',
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    }]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
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
    filename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': _path.src
    }
  }
}

module.exports = { baseWebpackConfig, _path }
