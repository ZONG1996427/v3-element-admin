/*
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-01-19 17:59:32
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-19 19:07:04
 */
import request from '@/utils/request'
const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
const vlogin = (data) => {
  return request({
    url: '/vue-element-admin/user/login',
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
  getUserInfo,
  vlogin
}
