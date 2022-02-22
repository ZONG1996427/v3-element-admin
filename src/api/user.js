import request from '@/utils/request'
const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
// 获取用户
const getUserInfo = (params) => {
  return request({
    url: '/getUserInfo',
    method: 'get',
    params
  })
}
const getDashboard = () => {
  return request({
    url: '/dashboard',
    method: 'get'
  })
}
export {
  login,
  getUserInfo,
  getDashboard
}
