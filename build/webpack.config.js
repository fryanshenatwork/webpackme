const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const _path = {
  main: path.resolve(__dirname, '../'),
  build: path.resolve(__dirname, '../build/'),
  dist: path.resolve(__dirname, '../dist/'),
  src: path.resolve(__dirname, '../src/')
}

var webpackConfig = {
  mode: 'production',
  entry: {
    main: './src/scss/main.scss'
  },
  module: {
    rules: [{
      test: /\.(scss|sass)$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./[name].css"
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [ '**/*' ]
    })
  ],
  output: {
    path: _path.dist
  }
}

module.exports = webpackConfig
