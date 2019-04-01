function rename(key) {
    return key.replace(/\.+\//, '').replace(/\.js/, '')
}

const requireContext = require.context('./sources', true, /.*\.js/)

const binds = requireContext.keys().map(key => (
    {
        name: rename(key),
        func: requireContext(key).default
    }
))

const install = Vue => {
    if (install.installed) return
    install.installed = true

    binds.forEach(el => {
        Vue.directive(el.name, el.func)
    })
}

export default install
