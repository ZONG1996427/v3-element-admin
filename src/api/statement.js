import request from '@/utils/request'

const getStatementList = (params) => {
  return request({
    url: '/getStatement',
    method: 'get',
    params
  })
}
export {
  getStatementList
}
