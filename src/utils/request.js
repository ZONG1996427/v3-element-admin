/*
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-01-19 17:42:04
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-20 08:37:03
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'
// 创建
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
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
