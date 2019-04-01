export default {
    valiChinese(rule, value, callback) {
        if (value.match(/^([\u4E00-\u9FA5A]|[·]){1,}$/)) {
            callback()
        } else {
            callback(new Error())
        }
    },
    valiNums(rule, value, callback) {
        if (!rule.required && value.length === 0) {
            callback()
            return
        }
        if (value.match(/^\d+(\.\d+)?$/)) {
            callback()
        } else {
            callback(new Error())
        }
    },
    valiMobile(rule, value, callback) {
        if (!rule.required && value.length === 0) {
            callback()
            return
        }
        if (value.match(/^[1][3,4,5,7,8,9][0-9]{9}$/)) {
            callback()
        } else {
            callback(new Error())
        }
    }
}
