const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 是否使用gzip
const productionGzip = true

// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

// 转为CND外链方式的npm包
// 键名是import的npm包名
// 键值是该库暴露的全局变量
const externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
}

// CDN外链，会插入到index.html中
const cdn = {
    // 开发环境
    dev: {
        css: [],
        js: []
    },
    // 生产环境
    build: {
        css: [],
        js: [
            '//unpkg.com/vue@2.5.21/dist/vue.runtime.min.js',
            '//unpkg.com/vue-router@3.0.2/dist/vue-router.min.js',
            '//unpkg.com/vuex@3.0.1/dist/vuex.min.js',
            '//unpkg.com/axios@0.18.0/dist/axios.min.js'
        ]
    }
}

module.exports = {
    publicPath: '/',
    assetsDir: 'static',
    outputDir: './dist',
    filenameHashing: false,
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                data: '@import "@/style/variables.scss";'
            }
        }
    },
    pwa: {
        name: '名称',
        themeColor: '#789262',
        msTileColor: '#789262',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        // configure the workbox plugin
        // workboxPluginMode: 'InjectManifest',
        // workboxOptions: {
        //     // swSrc is required in InjectManifest mode.
        //     swSrc: 'dev/sw.js'
        //     // ...other Workbox options...
        // },
        iconPaths: {
            favicon32: 'static/icons/favicon-32x32.png',
            favicon16: 'static/icons/favicon-16x16.png',
            appleTouchIcon: 'static/icons/apple-touch-icon-152x152.png',
            maskIcon: 'static/icons/safari-pinned-tab.svg',
            msTileImage: 'static/icons/msapplication-icon-144x144.png'
        }
    },
    chainWebpack: config => {
        config.plugins.delete('prefetch')
        config.plugin('html').tap(args => {
            if (process.env.NODE_ENV === 'production') {
                args[0].cdn = cdn.build
            }
            if (process.env.NODE_ENV === 'development') {
                args[0].cdn = cdn.dev
            }
            return args
        })

        if (process.env.NODE_ENV === 'development') {
            config.output.set('filename', 'static/js/[name].js')
            config.output.set('chunkFilename', 'static/js/[id].js')
        } else {
            config.output.set('filename', 'static/js/[name].[hash].js')
            config.output.set('chunkFilename', 'static/js/[id].[hash].js')
        }
    },
    configureWebpack: () => {
        const myConfig = { devtool: 'source-map' }
        if (process.env.NODE_ENV === 'production') {
            // 生产环境npm包转CDN
            myConfig.externals = externals
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
        open: true, //配置自动启动浏览器
        proxy: 'http://192.168.50.192:8081/ag/action'
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
