'use strict'

import $ from 'jquery'
import Vue from 'vue/dist/vue.esm'
import mixin from './eboard_mixins'

export default (() => {
  const target = '#app[data-scene="eboard"]'
  const $target = $(target)
  if ($target.length !== 1) { return false }

  new Vue({
    mixins: [mixin],
    el: target
  })
})()
