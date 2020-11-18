'use strict'

export default {
  functional: true,
  template: `<div
    class="cm-information-card"
    :class="classstyle"
    :data-theme="data.theme"
    :data-anyFetched="data._fetchedData.fetched + ''"
  >
    <div class="title-block">
      <span>{{ data.deviceName }}</span>
    </div>
    <div class="value-block">
      <template v-if="data._fetchedData.fetched === true">
        <span class="value">{{ data._fetchedData.data }}</span>
        <span class="unit">{{ data.unit }}</span>
      </template>
      <template v-else>
        <span class="value">-</span>
      </template>
    </div>
  </div>`,
  props: [ 'data', 'classstyle', 'theme' ]
}
