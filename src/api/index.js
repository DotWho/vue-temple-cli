function rename(key) {
  let name = key.replace(/\.+\//, '').replace(/\.js/, '')
  name = name.substring(0, 1).toUpperCase() + name.substring(1)
  return name
}

let api = {}

const requireContext = require.context('./sources', true, /.*\.js/)
requireContext.keys().map(key => {
  api[rename(key)] = requireContext(key).default
})

const install = Vue => {
  if (install.installed) return
  install.installed = true

  Object.defineProperties(Vue.prototype, {
    $Api: {
      get() {
        return api
      }
    }
  })
}

export default install
