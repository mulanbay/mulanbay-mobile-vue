import axios from 'axios'
import store from '@/store'
import { Toast,Notify } from 'vant'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
import { getToken } from '@/utils/auth'
import Router from '@/router/index'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    //console.log(config);
    let token = getToken();
    //console.log('token:'+token)
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    // if the custom code is not 0, it is judged as an error.
    if (res.code !== 0) {
      Notify({ type: 'danger', message: '请求失败:'+res.message });
      if (res.code === 10004 || res.code === 10019 ) {
        Router.push({name:'Login',query: {redirectPath:window.location.href}})
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    Toast.clear()
    Notify({ type: 'danger', message: '请求异常:'+error })
    return Promise.reject(error)
  }
)

export default service
