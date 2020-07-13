import Storage from './localStorage'
import store from '@/store'
import axios from 'axios'

const lsg = new Storage('byt')

let source = {
  token: null,
  cancel: null
}

export default {
  axiosUpdate() {
    source.token && source.cancel()
    source = axios.CancelToken.source()
  },
  axiosToken() {
    return source.token
  },
  setStorage(key, value, expired = 30000) {
    if (typeof expired === 'string') {
      let baseNum = 0
      const temp = expired.split(' ')
      switch (temp[1]) {
        case 'Minutes':
          baseNum = 60000
          break
        case 'Hours':
          baseNum = 3600000
          break
        case 'Day':
          baseNum = 86400000
          break
        case 'Week':
          baseNum = 604800000
          break
      }
      expired = temp[0] * baseNum
    }
    lsg.set(key, value, expired)
  },
  getStorage(key, normal) {
    return lsg.get(key) || normal
  },
  delStorage(key) {
    lsg.delete(key)
  },
  fmtMoney(value, point = 2) {
    if (!value) {
      return
    }

    if (value == 0) {
      return '0.00'
    }

    value = Number(value)
      .toFixed(point)
      .toString()

    let n1 = value.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
      return s1.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,') + s2
    })

    return n1
  },
  fmtTime(value, fmt = 'yyyy-MM-dd') {
    if (!value) {
      return
    }

    const time = new Date(value),
      o = {
        'M+': time.getMonth() + 1, // 月
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds() // 秒
      }

    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (time.getFullYear() + '').substr(4 - RegExp.$1.length)
      )

    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )

    return fmt
  },
  fmtData(rows, fmt, defs = []) {
    if (rows && rows.length > 0) {
      defs = []
      rows.forEach(el => {
        let tmp = fmt(el)
        if (tmp) {
          defs.push(tmp)
        }
      })
    }
    return defs
  },
  debounce(fn, wait = 50, immediate) {
    let timer
    return function() {
      if (immediate) {
        fn.apply(this, arguments)
      }
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait)
    }
  },
  getToken() {
    const token = this.getStorage('TOKEN')
    if (token) {
      store.dispatch('setToken', token)
      return token
    } else {
      return null
    }
  }
}
