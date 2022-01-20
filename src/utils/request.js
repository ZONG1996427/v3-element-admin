import axios from 'axios'
// 创建
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

// 设置请求头
// request.defaults.headers[icode] = 'ca7a35696da3b6aac4475affcf786832'

export default request
