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
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config.output.set('filename', 'static/js/[name].js')
            config.output.set('chunkFilename', 'static/js/[id].js')
        } else {
            config.output.set('filename', 'static/js/[name].[hash].js')
            config.output.set('chunkFilename', 'static/js/[id].[hash].js')
        }
    },
    devServer: {
        port: 9900, // 端口号
        // host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
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
