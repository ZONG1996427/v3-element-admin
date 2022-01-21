import request from '@/utils/request'
const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户
const getUserInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'get'
  })
}
export {
  login,
  getUserInfo
}
