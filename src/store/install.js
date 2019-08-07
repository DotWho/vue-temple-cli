import store from './index'

const install = Vue => {
  if (install.installed) return
  install.installed = true

  Object.defineProperties(Vue.prototype, {
    $store: {
      get() {
        return {
          ...store
        }
      }
    }
  })
}

export default install
