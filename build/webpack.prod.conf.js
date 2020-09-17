'use strict'
process.env.NODE_ENV = 'production'

const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')
const baseWebpackConfig = baseConfig.baseWebpackConfig(process)
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const _path = baseConfig._path

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
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
      new TerserPlugin({
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
    new CopyWebpackPlugin({
      patterns: [
        { from: `${_path.src}/public`, to: `public` }
      ]
    })
  ]
})

webpack(prodWebpackConfig, (done, err) => {
  const chalk = require('chalk')
  const log = require('./log')
  if (err.compilation.errors.length > 0) {
    console.log(`\n\n\n================================================================================`)
    console.log(err.compilation.errors[0])
    console.log(`================================================================================\n\n\n`)
    log(chalk.red.bold(`Build falied`))
  } else {
    log(chalk.green.bold('Build success'))
  }
})
