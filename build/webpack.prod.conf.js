const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const baseWebpackConfig = baseConfig.baseWebpackConfig
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const _path = baseConfig._path

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: "all",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    },
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
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: '*'
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      title: `Template`,
      minify: false
    })
  ]
})

module.exports = prodWebpackConfig
