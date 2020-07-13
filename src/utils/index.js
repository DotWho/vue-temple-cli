import Common from './common'

const install = Vue => {
  if (install.installed) return
  install.installed = true

  Object.defineProperties(Vue.prototype, {
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
