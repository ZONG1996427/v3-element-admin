import request from '@/utils/request'
const getUerList = (params) => {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}
export {
  getUerList
}
