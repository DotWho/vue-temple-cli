// 首屏优化
import Index from '@/views/index'

const router = [
    {
        path: '/',
        name: 'index',
        component: () =>
            import(/* webpackChunkName: "index" */ '@/views/index'),
        meta: {
            title: '123'
        }
    }
]

export default router
