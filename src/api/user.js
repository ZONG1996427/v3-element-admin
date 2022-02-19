import request from '@/utils/request'
const login = (data) => {
  return request({
    // url: '/sys/login',
    url: 'adminUser/login',
    method: 'post',
    data
  })
}
// 获取用户
const getUserInfo = (params) => {
  return request({
    url: '/sys/profile',
    method: 'get',
    params
  })
}
export {
  login,
  getUserInfo
}
