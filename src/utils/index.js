import Common from './common'

const install = Vue => {
  if (install.installed) return
  install.installed = true

  Object.defineProperties(Vue.prototype, {
    // 挂载在 Vue 原型的 $Common 对象上
    $Common: {
      get() {
        return {
          ...Common
        }
      }
    }
  })
}

export default install
