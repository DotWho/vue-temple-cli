import Common from './common'
import Vali from './validate'

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
        },
        $Vali: {
            get() {
                return {
                    ...Vali
                }
            }
        }
    })
}

export default install
