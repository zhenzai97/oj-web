import axios from 'axios'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://localhost:8121/', // url = base url + request url
  withCredentials: true, // 表示跨域请求时是否需要使用凭证
  timeout: 5000, // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      ElMessage.error(res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    ElMessage.error('接口信息报错error' + error)
    return Promise.reject(error)
  }
)

export default service
