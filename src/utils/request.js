/**
 * axios二次封装
 */
import axios from "axios"
import config from "../config/index.js"
import {ElMessage} from "element-plus"
import router from "../router/index.js"

const TOKEN_INVALID = 'Token认证失败 请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后再试'


// 创建axios实例对象，添加全局配置
const service = axios.create({
  // 自动根据配置去匹配url
  baseURL: config.baseApi,
  // 后台管理通常8秒
  timeout: 8000
})

// 请求拦截
service.interceptors.request.use((req) => {
  // 动态添加token，之后加
  // TODO
  const headers = req.headers
  if (!headers.Authorization) {
    headers.Authorization = 'Bearer xxxxxx'
  }
  return req;
  // 其它比如时间戳转日期，都可以在这里做拦截
})

// 响应拦截
service.interceptors.response.use((res) => {
  const {code, data, msg} = res.data
  console.log('code', code)
  if (code === 200) {
    // 不需要在每个页面写res.data
    return data;
    // 未登录
  } else if (code === 40001) {
    // 也可以用msg，后端反的，也可以前端自己定义
    ElMessage.error(TOKEN_INVALID)
    // 看完消息再跳转
    setTimeout(() => {
      router.push('/login')
    }, 2000)
    return Promise.reject(TOKEN_INVALID)
  } else {
    // 常规业务报错
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

/**
 * 请求的核心函数
 * @param options 请求配置
 */

function request(options) {
  // get和post不一样,post请求参数叫data,get的时候参数叫params，我们这边可以打平，可以都叫data
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  // 局部控制mock
  if(typeof options.mock !== 'undefined') {
    config.mock = options.mock
  }
  // 这样写是为了确保线上环境api不会出错
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    // options用于扩展，可以传入loading, timeOut等等
    return request({url, data, method: item, ...options})
  }
})

export default request;
