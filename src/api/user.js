/*
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-01-19 17:59:32
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-20 08:24:02
 */
import request from '@/utils/request'
const login = (data) => {
  return request({
    url: '/sys/login',
    // url: 'adminUser/login',
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
