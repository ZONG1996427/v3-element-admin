import request from '@/utils/request'
const getDashboard = () => {
  return request({
    url: '/dashboard',
    method: 'get'
  })
}

export {
  getDashboard
}
