const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')
const baseWebpackConfig = baseConfig.baseWebpackConfig
// const _path = baseConfig._path

const lintWebpackConfig = merge.smart(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          { loader: 'prettier-loader' }
        ]
      },
      // {
      //   test: /\.(scss|sass)$/,
      //   use: [
      //   ]
      // }
    ]
  }
})

module.exports = webpack(lintWebpackConfig, (done, err) => {
  console.clear()
  console.log('Linted')
})
