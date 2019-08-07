// 设置相应缓存的名字的前缀和后缀
workbox.core.setCacheNameDetails({
  prefix: 'htt',
  suffix: 'v2.4.0'
})
// 让我们的service worker尽快的得到更新和获取页面的控制权
workbox.skipWaiting()
workbox.clientsClaim()

/*
 * vue-cli3.0通过workbox-webpack-plagin 来实现相关功能，我们需要加入
 * 以下语句来获取预缓存列表和预缓存他们，也就是打包项目后生产的html，js，css等* 静态文件
 */
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

// 对我们请求的数据进行缓存，这里采用 networkFirst 策略
workbox.routing.registerRoute(
  new RegExp('.*.html'),
  workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
  /\.(png|jpg|jpeg|gif|webp)$/,
  // 对于图片资源使用缓存优先
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    // 设置最大缓存数量以及过期时间
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
)

// workbox.routing.registerRoute(
//     /\.(js|css)$/,
//     workbox.strategies.staleWhileRevalidate({
//         cacheName: 'jcss'
//     })
// )

workbox.routing.registerRoute(
  new RegExp('https://unpkg.com/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn'
  })
)
