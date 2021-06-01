import * as $ from 'jquery'

// eslint-disable-next-line
console.log('WebpackMe is working')

const updatePreferColorSchema = function (event: { submitter: string }) : boolean {
  const button = $(event.submitter)
  const selectedVal:string = button.val() + ''

  $('body').attr('data-prefers-color', selectedVal)
  return true
}
window.updatePreferColorSchema = updatePreferColorSchema