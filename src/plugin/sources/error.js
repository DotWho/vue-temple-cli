export default {
    install(Vue, options) {
        if (options.developmentOff && process.env.NODE_ENV === 'development')
            return
        Vue.config.errorHandler = (error, vm) => {
            const info = {
                type: 'script',
                code: 0,
                mes: error.message,
                url: window.location.href
            }

            Vue.nextTick(() => {
                console.log({
                    title: '错误，详见console',
                    desc: `<pre>${JSON.stringify(
                        info,
                        null,
                        4
                    )}</pre>`,
                    duration: 5000
                })
            })
        }
    }
}
