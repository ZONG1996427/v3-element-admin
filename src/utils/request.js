import axios from 'axios'
// 创建
const fatch = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

export default fatch
