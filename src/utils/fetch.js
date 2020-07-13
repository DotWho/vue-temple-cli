import axios from 'axios'
import store from '../store'
import router from '../router'
import qs from 'qs'
import Common from '@/utils/common'

const instance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  // baseURL: process.env.VUE_APP_API,
  timeout: 5000,
  // retry: 2,
  retryDelay: 1000,
  responseType: 'json'
})

// request 拦截器
instance.interceptors.request.use(
  config => {
    config.cancelToken = Common.axiosToken()
    if (!config.reCon) {
      let token = store.getters.token //? store.getters.token : Common.getStorage('TOKEN', '')
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      if (token) {
        config.headers['Session-Key'] = token
      }

      if (config.headers['Content-Type'] === 'multipart/form-data') {
        return config
      }

      if (
        config.method === 'post' ||
        config.method === 'put' ||
        config.method === 'delete'
      ) {
        // 序列化
        config.data = qs.stringify(config.data, {
          arrayFormat: 'indices'
        })
        // qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })  // 'a[0]=b&a[1]=c'
        // qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' }) // 'a[]=b&a[]=c'
        // qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })   // 'a=b&a=c'
      }
      if (config.method === 'get') {
        config.url += '?' + qs.stringify(config.data, { arrayFormat: 'repeat' }) // 'a=b&a=c'
      }
      if (config.method === 'data') {
        config.method = 'post'
      }
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// response 拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  err => {
    var config = err.config
    // 没有配置文件返回错误
    if (!config || !config.retry) return Promise.reject(err)

    // 获取重试值或者重置
    config.__retryCount = config.__retryCount || 0

    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err)
    }

    config.__retryCount += 1

    // 新建promise重试
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve()
      }, config.retryDelay || 1)
    })

    // 返回axios
    return backoff.then(function() {
      const newData = {
        data: config.data,
        method: config.method,
        url: config.url,
        reCon: true,
        __retryCount: config.__retryCount,
        retry: config.retry
      }
      return instance(newData)
    })
  }
)

function fetch(options) {
  return new Promise((resolve, reject) => {
    instance(options)
      .then(response => {
        const res = response.data
        switch (res.code) {
          case 1: // 成功
            resolve(res.body)
            break
          default:
            // Message.error(
            //     res.message || '服务器内部错误'
            // )
            reject()
        }
      })
      .catch(error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              // Message.error(
              //     '请求错误'
              // )
              reject()
              break
            case 401:
              // Message.error(
              //     '未授权，请登录'
              // )
              reject()
              break
            case 403:
              router.replace({ path: '/' })
              reject()
              break
            case 404:
              reject(`请求地址出错: ${error.response.config.url}`)
              // router.replace({ path: '/error/404' })
              break
            case 408:
              // Message.error(
              //     '请求超时'
              // )
              reject()
              break
            case 500:
              // Message.error(
              //     '服务器内部错误'
              // )
              reject()
              break
            case 501:
              // Message.error(
              //     '服务未实现'
              // )
              reject()
              break
            case 502:
              // Message.error(
              //     '网关错误'
              // )
              reject()
              break
            case 503:
              // Message.error(
              //     '服务不可用'
              // )
              reject()
              break
            case 504:
              // Message.error(
              //     '网关超时'
              // )
              reject()
              break
            case 505:
              // Message.error(
              //     'HTTP版本不受支持'
              // )
              reject()
              break
            default:
              // Message.error(
              //     `
              //         网络不给力，请重试(
              //         ${error.response.status}
              //     )`
              // )
              reject()
              break
          }
        } else {
          // Message.error('网络请求超时，请重试。')
          reject()
        }
      })
  })
}

export default {
  post: function(url, data, retry) {
    return fetch({
      url: `${process.env.VUE_APP_API}${url}`,
      method: 'POST',
      data,
      retry
    })
  },
  get: function(url, data, retry) {
    return fetch({
      url: `${process.env.VUE_APP_API}${url}`,
      method: 'GET',
      data,
      retry
    })
  },
  file: function(url, data) {
    return fetch({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: `${process.env.VUE_APP_API}${url}`,
      method: 'POST',
      data
    })
  },
  custom: function(options) {
    return fetch(options)
  }
}
