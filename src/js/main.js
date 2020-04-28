if (module.hot) {
  module.hot.accept()
}

require('jquery')
require('popper.js')
require('bootstrap')
require('bootstrap/scss/bootstrap.scss')

require('@/scss/main.scss')

console.log('Webpack Comipled.')
