const fs = require('fs');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (_path) {
  const templatesPath = _path.src + '/templates/'
  const searchRecursive = function (dir, pattern) {
    var results = []
    fs.readdirSync(dir).forEach(function (dirInner) {
      dirInner = path.resolve(dir, dirInner)
      var stat = fs.statSync(dirInner)
      if (stat.isDirectory()) {
        results = results.concat(searchRecursive(dirInner, pattern))
      }
      if (stat.isFile() && dirInner.endsWith(pattern)) {
        results.push(dirInner)
      }
    })
    return results
  }

  const templates = searchRecursive(templatesPath, '.html').map(e => {
    return new HtmlWebpackPlugin({
      template: e,
      filename: e.replace(templatesPath, ''),
      inject: true,
      minify: false
    })
  })

  return templates
}