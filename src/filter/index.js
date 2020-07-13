import Common from '@/utils/common'

const filters = {
  // 格式化金额
  fmtMoney: (value, point) => {
    return Common.fmtMoney(value, point)
  },
  // 格式化时间
  fmtTime: (value, fmt) => {
    return Common.fmtTime(value, fmt)
  }
}

const install = Vue => {
  if (install.installed) return
  install.installed = true

  Object.keys(filters).forEach(el => {
    Vue.filter(el, filters[el])
  })
}

export default install
