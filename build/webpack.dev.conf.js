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
    contentBase: _path.dist,
    hot: true,
    inline: true,
    publicPath: '/',
    watchContentBase: true,
    compress: true,
    progress: false,
    open: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = devWebpackConfig
