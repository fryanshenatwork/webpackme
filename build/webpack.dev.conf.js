'use strict'
process.env.NODE_ENV = 'development'

const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const baseConfig = require('./webpack.base.conf')
const baseWebpackConfig = baseConfig.baseWebpackConfig(process)
const _path = baseConfig._path

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
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

const server = new webpackDevServer(webpack(devWebpackConfig), devWebpackConfig.devServer)

const [, , ...processParams] = process.argv
const args = Object.assign(
  {
    port: 8080,
    host: '0.0.0.0'
  }, require('yargs')(processParams).argv
)

new Promise(async (resolve) => {
  const getPort = require('get-port')
  await getPort({
    host: args.host,
    port: getPort.makeRange(args.port, args.port + 10)
  })
    .then(res => { resolve(res) })
})
  .then((port) => {
    args.port = port
    server.listen(args.port, args.host, () => {
      console.log(`Starting server on ${args.host}:${args.port}`)
    })
  })
