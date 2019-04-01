// 动态注册compontents内的所有组件，之后在全局无需注册即可使用
// 格式为  目录名文件名，
// 例子1  src/components/page/header.vue, <PageHeader>
// 例子2  src/components/Hello.vue, <Hello>

function rename(key) {
    let name = ''
    let temp = key
        .replace(/\.+\//, '')
        .replace(/\.vue/, '')
        .split('/')
    temp.forEach(el => {
        name += el
            .toLowerCase()
            .replace(/( |^)[a-z]/g, L => L.toUpperCase())
    })
    return name
}

const requireContext = require.context('./', true, /.*\.vue$/)

const components = requireContext.keys().map(key => (
    {
        name: rename(key),
        component: requireContext(key).default
    }
))

const install = Vue => {
    if (install.installed) return
    install.installed = true

    components.forEach(el => {
        Vue.component(el.name, el.component)
    })
}

export default install
