import request from '@/utils/request'
// 获取用户图标数据
const getRoleEchartsData = (params) => {
  return request({
    url: '/getRoleEchartsData',
    method: 'get',
    params
  })
}
export {
  getRoleEchartsData
}
