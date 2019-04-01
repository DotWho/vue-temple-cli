import Common from '@/utils/common'

const filters = {
    // 格式化金额
    fmtMoney: (value, point) => {
        return Common.fmtMoney(value, point)
    },
    // 格式化时间
    fmtTime: (value, fmt) => {
        return Common.fmtTime(value, fmt)
    },
    // 格式化数字 * 100
    fmtRate: (value, point) => {
        return Common.fmtRate(value, point)
    },
    // 4位一空格（格式化银行卡）
    fmtBank: val => {
        if (val) {
            return val
                .toString()
                .replace(/\s/g, '')
                .replace(/(.{4})/g, '$1 ')
        }
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
