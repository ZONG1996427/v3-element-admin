/*
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-01-19 17:42:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-22 10:20:07
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'
/**
 * @name: request
 * @msg: 创建axios请求，baseURL三元判断是因为fast mock接口并非真实部署在服务端接口，在前端项目部署到gitee时，接口并没有真实存在的服务器，
 * gitee会拦截掉，所以在线上环境使用proxy代理还是会出现跨域，直接写死，本地启动时仍然是代理
 * @param {*}
 * @return {*}
 */
const request = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://www.fastmock.site/mock/1d2f66ed7851fccaf05ec18b36cc744e/api' : process.env.VUE_APP_BASE_URL,
  timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    config.headers.Authorization = store.getters.token
    if (isCheckTimeout()) {
      store.dispatch('user/logout')
      ElMessage.error('token失效,退出登录')
    }
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 处理响应拦截器
request.interceptors.response.use(result => {
  // 响应成功
  // 1-响应成功，业务成功
  const { data, message, success, code } = result.data
  if (success && code === 200) {
    return data
  } else {
    // 2-响应成功，业务失败
    ElMessage.error(message)
    return Promise.reject(data)
  }
  // 响应失败
}, err => {
  // 服务端token过期，判断状态码
  if (err.response && err.response.data && err.response.data.code === 401) {
    ElMessage(new Error(err.message))
    store.dispatch('user/logout')
  }
  ElMessage(new Error(err.message))
  return Promise.reject(err)
})

export default request
