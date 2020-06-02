const path = require('path')

module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/style/variables.scss";$src: "~@/assets/";'
      }
    }
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
