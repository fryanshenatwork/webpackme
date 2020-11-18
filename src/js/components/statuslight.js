'use strict'

export default {
  functional: true,
  template: `<div
    class="cm-status"
    :data-anyFetched="anyFetched + ''"
    :data-color="lightcolor"
    :data-info="dataInfo"
  >
    <i></i>
    <span v-if="showtitle">{{ data.deviceName }}</span>
  </div>`,
  props: [ 'data', 'showtitle' ],
  computed: {
    dataInfo: function () {
      return JSON.stringify(this.data.devices)
    },
    anyFetched: function () {
      const _this = this

      const found = _this.data.devices.find(e => {
        return e._fetchedData.fetched === true
      })

      return found !== undefined
    },
    lightcolor: function () {
      const _this = this

      const found = _this.data.devices.find(e => {
        return e._fetchedData.fetched === true &&
          ![null, undefined, ''].includes(e._fetchedData.data) &&
          e._fetchedData.data === 1
      })

      let unMatchedColor, unFetchedColor = ''
      try {
        unMatchedColor = _this.data.defaultColor.unMatched
        unFetchedColor = _this.data.defaultColor.unFetched
      } catch {
        // nothing
      }

      if (found) {
        return found.color
      } else if (_this.anyFetched) {
        return unMatchedColor ? unMatchedColor : 'white'
      } else {
        return unFetchedColor ? unFetchedColor : 'black'
      }
    }
  },
  beforeMount: function () {
  }
}
