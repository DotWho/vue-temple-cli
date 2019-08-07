const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 是否使用gzip
const productionGzip = true

// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

// 转为CND外链方式的npm包
// 键名是import的npm包名
// 键值是该库暴露的全局变量
// const externals = {
//     vue: 'Vue',
//     iview: 'iview',
//     'vue-router': 'VueRouter',
//     // vuex: 'Vuex',
//     axios: 'axios'
// }

// CDN外链，会插入到index.html中
// const cdn = {
//     // 开发环境
//     dev: {
//         css: ['https://unpkg.com/iview@3.4.2/dist/styles/iview.css'],
//         js: []
//     },
//     // 生产环境
//     build: {
//         css: ['https://unpkg.com/iview@3.4.2/dist/styles/iview.css'],
//         js: [
//             'https://unpkg.com/vue@2.6.10/dist/vue.min.js',
//             'https://unpkg.com/iview@3.4.2/dist/iview.min.js',
//             'https://unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
//             // 'https://unpkg.com/vuex@3.1.1/dist/vuex.min.js',
//             'https://unpkg.com/axios@0.18.0/dist/axios.min.js'
//         ]
//     }
// }

module.exports = {
    publicPath: '/',
    assetsDir: 'static',
    outputDir: './dist',
    filenameHashing: true,
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                data: `@import "@/style/variables.scss";$src: "${
                    process.env.VUE_APP_STATIC
                }";`
            }
        }
    },
    pwa: {
        name: '红天桃信息系统',
        themeColor: '#789262',
        msTileColor: '#789262',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        // configure the workbox plugin
        /*
         * 两个模式，GenerateSW（默认）和 InjectManifest
         * GenerateSW 在我们build项目时候，每次都会新建一个service worker文件
         * InjectManifest 可以让我们编辑一个自定义的service worker文件，实现更多的功能，并且可以
         * 拿到预缓存列表
         */
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js',
            importWorkboxFrom: 'local'
            // skipWaiting: true,
            // clientsClaim: true,
            // swSrc is required in InjectManifest mode.
            // swSrc: 'static/sw.js',
            // ...other Workbox options...
            // exclude: [/\.html$/]
        },
        iconPaths: {
            favicon32: 'static/icons/favicon-32x32.png',
            favicon16: 'static/icons/favicon-16x16.png',
            appleTouchIcon: 'static/icons/apple-touch-icon-152x152.png',
            maskIcon: 'static/icons/safari-pinned-tab.svg',
            msTileImage: 'static/icons/msapplication-icon-144x144.png'
        }
    },
    chainWebpack: config => {
        // 生产环境npm包转CDN
        // config.plugins.delete('prefetch')
        // config.plugin('html').tap(args => {
        //     if (process.env.NODE_ENV === 'production') {
        //         args[0].cdn = cdn.build
        //     }
        //     if (process.env.NODE_ENV === 'development') {
        //         args[0].cdn = cdn.dev
        //     }
        //     return args
        // })

        // config.optimization.minimize(true)
        // config.optimization.delete('splitChunks')
        // config.optimization.splitChunks({
        //     chunks: 'all', // initial、async和all
        //     minSize: 30000, // 形成一个新代码块最小的体积
        //     maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
        //     maxInitialRequests: 3, // 最大初始化请求数
        //     automaticNameDelimiter: '~', // 打包分割符
        //     name: true,
        //     cacheGroups: {
        //         vendor: {
        //             name: 'vendor',
        //             test: /[\\/]node_modules[\\/]/, //打包第三方库
        //             chunks: 'all',
        //             priority: 10 // 优先级
        //         },
        //         common: {
        //             // 打包其余的的公共代码
        //             minChunks: 2, // 引入两次及以上被打包
        //             name: 'common', // 分离包的名字
        //             chunks: 'all',
        //             priority: 5
        //         }
        //     }
        // })

        if (process.env.NODE_ENV === 'development') {
            config.output.set('filename', 'static/js/[name].js')
            config.output.set('chunkFilename', 'static/js/[id].js')
        } else {
            config.output.set('filename', 'static/js/[name].[hash].js')
            config.output.set('chunkFilename', 'static/js/[id].[hash].js')
        }
    },
    configureWebpack: () => {
        const myConfig = {
            devtool: 'source-map',
            resolve: {
                alias: {
                    '@': path.resolve('./src'),
                    '@com': path.resolve('./src/components')
                }
            }
        }
        if (process.env.NODE_ENV === 'production') {
            // 生产环境npm包转CDN
            // myConfig.externals = externals
            myConfig.plugins = []
            productionGzip &&
                myConfig.plugins.push(
                    new CompressionWebpackPlugin({
                        test: new RegExp(
                            '\\.(' + productionGzipExtensions.join('|') + ')$'
                        ),
                        threshold: 8192,
                        minRatio: 0.8
                    })
                )
        }
        return myConfig
    },
    devServer: {
        port: 9900, // 端口号
        // host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true //配置自动启动浏览器
        // proxy: {
        //     '/proxyApi': {
        //         target: 'http://192.168.50.192:8081/ag/action', // Test
        //         ws: false,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/proxyApi': ''
        //         }
        //     }
        // }
    }
}
