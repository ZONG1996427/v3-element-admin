/*
 * @Author: 宗
 * @Date: 2022-02-11 14:24:51
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-17 14:12:39
 */
// 判断是否需要添加到tag，我们应该设置一个白名单，将其不处理，例如登录页，404等
const whiteList = ['/login', '/import', '/404', '/401']
const isTag = tag => {
  // 如果找到了,取个反，false时
  return !whiteList.includes(tag)
}
export {
  isTag
}
