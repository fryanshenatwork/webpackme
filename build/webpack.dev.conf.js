const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')
const baseWebpackConfig = baseConfig.baseWebpackConfig
const _path = baseConfig._path

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 8461,
    contentBase: _path.src,
    hot: true,
    inline: true,
    publicPath: '/',
    watchContentBase: true,
    compress: true,
    progress: false,
    open: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: ['node_modules/**/*', _path.dist, _path.build]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: false
})

module.exports = devWebpackConfig
