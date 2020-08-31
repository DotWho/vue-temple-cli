module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/style/variables.scss";$src: "~@/assets/";'
      }
    }
  },
  // chainWebpack(config) {
  //   //提高首屏速度
  //   config.plugin('preload').tap(() => [
  //     {
  //       rel: 'preload',
  //       fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
  //       include: 'initial'
  //     }
  //   ])
  //   //当页面很多时，它将导致太多无意义的请求
  //   config.plugins.delete('prefetch')
  // },
  devServer: {
    port: 9999, // 端口号
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
