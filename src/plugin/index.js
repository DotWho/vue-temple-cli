const options = {
    error: {
        // 设为true后在开发环境不会收集错误信息
        developmentOff: false
    }
}

function rename(key) {
    return key.replace(/\.+\//, '').replace(/\.js/, '')
}

const requireContext = require.context('./sources', true, /.*\.js/)

const plugin = requireContext.keys().map(key => ({
    main: requireContext(key).default,
    option: options[rename(key)]
}))

const install = Vue => {
    if (install.installed) return
    install.installed = true

    plugin.forEach(el => {
        Vue.use(el.main, el.option)
    })
}

export default install
