import Vue from 'vue'
import Router from 'vue-router'
import Common from '@/utils/common'

Vue.use(Router)

let routes = []

const requireContext = require.context('./routes', true, /.*\.js/)
requireContext.keys().map(key => {
    routes.push(...requireContext(key).default)
})

routes.push({
    path: '*',
    redirect: '/'
})

// 在按下 后退/前进 按钮时，简单地让页面滚动到顶部或原来的位置
const scrollBehavior = (to, from, savedPosition) => {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta.keepAlive) {
        return savedPosition
    }
    // 异步滚动操作
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ x: 0, y: 1 })
        }, 0)
    })
}

const router = new Router({
    mode: 'history',
    scrollBehavior,
    routes
})

router.beforeEach((to, from, next) => {
    Common.axiosUpdate()
    next()
})

export default router
