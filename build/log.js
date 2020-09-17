const chalk = require('chalk')
const log = console.log
const main = chalk.blue('ℹ') + ' ' + chalk.grey('｢webpackme｣') + ': '

module.exports = function (str) {
  log(main + str)
}