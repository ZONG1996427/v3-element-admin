import axios from 'axios'
import { ElMessage } from 'element-plus'
// 创建
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
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
  ElMessage(new Error(err.message))
  return Promise.reject(err)
})

export default request
