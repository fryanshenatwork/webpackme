const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const baseWebpackConfig = baseConfig.baseWebpackConfig
const _path = baseConfig._path
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['main.js', 'main.css']
    })
  ]
})

module.exports = prodWebpackConfig
