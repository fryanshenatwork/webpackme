const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./[name].css"
    })
  ],
  output: {
    path: _path.dist
  }
}

module.exports = { baseWebpackConfig, _path }
