import $ from 'jquery'

// eslint-disable-next-line
console.log('WebpackMe is working')

const updatePreferColorSchema = function (event) {
  const button = $(event.submitter)
  const selectedVal = button.val()

  $('body').attr('data-prefers-color', selectedVal)
}
window.updatePreferColorSchema = updatePreferColorSchema
