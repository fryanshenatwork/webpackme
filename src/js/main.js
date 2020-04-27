if (module.hot) {
  module.hot.accept()
}

require('@/scss/main.scss')
require('jquery')
require('popper.js')
require('bootstrap')
require('bootstrap/scss/bootstrap.scss')

console.log('Webpack Comipled.')
