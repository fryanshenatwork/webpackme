'use strict'

import $ from 'jquery'
import '@/plugins/jquery.marquee'

export default {
  data() {
    return {
      state: {
        configSettled: false,
        updateCount: {
          realtime: 0,
          alarm: 0
        },
        msg: '初始化'
      },
      responses: {
        config: {}
      },
      staticData: {
        filtedList: []
      },
      realtimeList: [],
      alarms: []
    }
  },
  components: {
    informationcard: require('./components/informationcard').default,
    statuslight: require('./components/statuslight').default
  },
  computed: {
    loading: function () {
      return false // dev
      // return this.state.configSettled === false || this.state.updateCount < 1
    }
  },
  async beforeMount() {
    const _this = this
    _this.state.msg = '初始化'

    if (
      [null, undefined, ''].includes(window.dashboardConfigPath)
    ) {
      console.error('[eboard_mixins] - undefined dashboardConfigPath.')
      return false
    }

    await $.ajax({
      url: window.dashboardConfigPath,
      method: 'get',
      async: true
    })
      .then((res) => {
        _this.responses.config = res
        _this.realtimeList = JSON.parse(JSON.stringify(_this.responses.config.list))
        _this.state.fetchedConfig = true

        const filtedList = []
        _this.realtimeList.forEach(block => {
          const deviceAction = function (device) {
            device._fetchedData = {
              fetched: false,
              data: null,
              time: null
            }
            const { pcmId } = device
            if (pcmId === undefined) { console.error('[eboard-mixin] - Can not found pcmId', device) }
            const { deviceId } = device
            if (deviceId === undefined) { console.error('[eboard-mixin] - Can not found deviceId', device) }
            filtedList.push({
              pcmId,
              deviceId,
              _link: device
            })
          }
          block.devices.forEach((device) => {
            deviceAction(device)
          })
          block.tables.forEach((table) => {
            table.devices.forEach((device) => {
              deviceAction(device)
            })
          })
        })

        _this.staticData.filtedList = filtedList

        setTimeout(() => {
          this._flowHelper_keepingPullData(true, 'realtime')
          this._flowHelper_keepingPullData(true, 'alarm')
        }, 500)

        _this.$forceUpdate()
        _this.state.configSettled = true
        return true
      })
      .catch((ers) => {
        console.error('[eboard_mixins:beforeMount] - Dashboard config undefined')
      })
  },
  mounted() {
    $('#app').css({ opacity: 1 })
  },
  methods: {
    _api: function (type = undefined, opts = {}) {
      const _this = this
      opts = $.extend({}, opts)
      return new Promise((resolve, reject) => {
        const API_MAIN_PATH = '/ajaxserver'
        const theSettings = {
          deviceData: {
            method: 'POST',
            postData: {
              module: 'dashboard',
              pcm_id: opts.pcm_id,
              func: 'pullDashboardData',
              type: 'device',
              datanum: 1,
              devid: opts.devid
            },
            timeout: _this.responses.config.timer.realtime.timeout
          },
          alarm: {
            method: 'POST',
            postData: {
              module: 'alarm',
              func: 'query',
              user_id: 1,
              type: 'unhandle'
            },
            timeout: _this.responses.config.timer.alarm.timeout
          }
        }

        if (type === undefined || !Object.keys(theSettings).includes(type)) {
          console.error('[_api] - undefined type', type, opts)
          reject('Type is undefined')
          return false
        }
        const theSetting = theSettings[type]

        Object.keys(theSetting.postData).forEach((eKey) => {
          if (theSetting.postData[eKey] === undefined) {
            reject(`${eKey} is undefined`)
          }
        })

        const timerOfAjax = setTimeout(() => {
          reject('timeout')
        }, theSetting.timeout * 1000)

        $.ajax({
          type: theSetting.method,
          timeout: theSetting.timeout * 1000,
          url: API_MAIN_PATH,
          data: theSetting.postData,
          success(res) {
            res = res.replace('[,]', '[]')
            try {
              res = JSON.parse(res)
              clearTimeout(timerOfAjax)
              resolve(res)
            } catch (error) {
              resolve(res)
            }
          },
          error(ers) {
            clearTimeout(timerOfAjax)
            reject(ers)
          }
        })
      }) // promise
    },
    async _api_fetchRealtime() {
      const _this = this
      const lists = _this.staticData.filtedList
      _this.state.msg = '取得即時資料'

      const fetchLists = []
      lists.forEach((e, ei) => {
        const originObj = lists[ei]
        fetchLists.push(
          _this._api(
            'deviceData',
            {
              pcm_id: e.pcmId,
              devid: e.deviceId
            }
          )
            .then((res) => {
              if (res.state !== 1) {
                console.error('Fetch state error', res)
                originObj._link._fetchedData.fetched = false
                return false
              }
              if (
                res.list
                && res.list[0]
                && res.list[0].data
                && res.list[0].data[0]
                && res.list[0].data[0].Data !== undefined
                && res.list[0].data[0].Time
              ) {
                if (originObj._link._fetchedData.fetched === false) {
                  originObj._link._fetchedData.fetched = true
                }
                originObj._link._fetchedData.data = res.list[0].data[0].Data
                originObj._link._fetchedData.time = res.list[0].data[0].Time
              }
            })
            .catch((ers) => {
              console.error('[eboard_mixins:_api_fetchRealtime] - fetch device data error', ers)
            })
        )
      })

      return new Promise((resolve, reject) => {
        const commonAction = function () {
          _this.realtimeList = Object.assing({}, _this.realtimeList)
        }
        Promise.all(fetchLists)
          .then((allDone) => {
            commonAction()
            resolve(true)
          })
          .catch((ers) => {
            commonAction()
            console.error('[api_fetchRealtime] - error', ers)
            reject(false)
          })
      })
    },
    async _api_getchAlarm() {
      const _this = this
      return new Promise((async (resolve, reject) => {
        _this._api('alarm', {})
          .then(res => {
            const oldAlarmList = _this.alarms
            const newAlarmList = []
            let anyChange = false

            if (
              res.alarm_list
              && Array.isArray(res.alarm_list)
              && res.alarm_list.length > 0
            ) {
              res.alarm_list.forEach(theAlarm => {
                // Existed
                if (
                  oldAlarmList.find(e => `${e.logID}` === `${theAlarm.logID}`)
                ) {
                  newAlarmList.push(theAlarm)
                } else {
                  // New
                  anyChange = false
                  newAlarmList.push(theAlarm)
                }
              })
            }

            oldAlarmList.forEach(e => {
              if (
                newAlarmList.find(ea => `${e.logID}` === `${ea.logID}`)
              ) {
                //
              } else {
                // remove some alarm
                anyChange = true
              }
            })

            // dev
            // anyChange = true
            // newAlarmList = [
            //   { time: '2020-09-09 17:35:00', msg: 'Testing Alarm' },
            //   { time: '2020-09-09 17:35:00', msg: 'Testing Alarm' }
            // ]
            // end dev

            if (
              newAlarmList.length !== oldAlarmList.length
            ) {
              anyChange = true
            }
            if (anyChange) {
              _this.alarms = newAlarmList
              _this._viewHelper_marquee()
            }

            resolve(true)
          })
          .catch(ers => {
            console.error('[_api_getAlarm] - error', ers)
            reject(false)
          })
      }))
    },
    async _flowHelper_keepingPullData(init = false, type = undefined) {
      const _this = this

      const theSettings = {
        'realtime': {
          method: _this._api_fetchRealtime,
          interval: _this.responses.config.timer.realtime.interval
        },
        'alarm': {
          method: _this._api_getchAlarm,
          interval: _this.responses.config.timer.alarm.interval
        }
      }
      if (type === undefined || !Object.keys(theSettings).includes(type)) {
        console.error('[_flowHelper_keepingPullData] - undefined type', type)
        return false
      }

      const theSetting = theSettings[type]
      if (init) {
        theSetting.interval = 0
      } else if (init === false && _this.state.updateCount === 1) {
        theSetting.interval = 5 * 1000
      } else {
        theSetting.interval = theSetting.interval * 1000
      }

      _this.$nextTick(() => { _this.state.updateCount[type]++ })

      if (window.timer === undefined) { window.timer = {} }
      if (window.timer[type] === undefined) { window.timer[type] === null}

      let theTimer = window.timer[type]
      if (theTimer && init) {
        clearTimeout(theTimer)
        delete window.timer[type]
      }

      theTimer = setTimeout(async () => {
        if (_this._helper_isExist(theTimer)) {
          clearTimeout(theTimer)
          theSetting.method()
            .then(() => {
              _this._flowHelper_keepingPullData(false, type)
            })
            .catch(() => {
              _this._flowHelper_keepingPullData(false, type)
            })
        } else {
          clearTimeout(theTimer)
        }
      }, theSetting.interval)
    },
    _helper_isExist(windowTimer = true) {
      const _this = this
      return _this !== undefined
        && _this !== null
        && _this !== ''
        && windowTimer !== undefined
        && windowTimer !== null
        && windowTimer !== ''
        && !_this._isDestroyed
    },
    _viewHelper_marquee() {
      const _this = this
      const { alarms } = _this

      this.$nextTick(async () => {
        const $el = $('#theAlarms')

        $el.addClass('fade-out')
        await setTimeout(() => {
          if ($el) { $el.marquee('destroy') }
          let html = ''
          alarms.forEach(e => {
            html += `<div>
              <span class="time">${e.time}</span>
              <span class="msg">${e.msg}</span>
            </div>`
          })
          $el
            .html(html)
            .marquee({
              pauseOnHover: true,
              duration: 15000
            })
          $el.removeClass('fade-out')
        }, 500)
      })
    }
  }
}
