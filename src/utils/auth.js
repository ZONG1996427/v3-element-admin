import { getItem, setItem } from '@/utils/storeage'
import { SET_TIME, SET_TIME_NEW } from '@/constant'
// 处理token过期,前端自己模拟过期
/**
 1-先定义获取,设置时间戳方法,比较时间(当前时间-登录时间>规定时效时间)然后再去request的请求拦截器里进行判断
 当 比较时间为true时,执行退出方法,调用user/logout,
 */
// 获取登录时间
const getTimeStamp = () => {
  // 获取的时间返回出去,供下面方法使用
  return getItem(SET_TIME)
}
// 设置登录时间,这个方法会在登录接口时执行一次,然后存到local里面
const setTime = () => {
  setItem(SET_TIME, Date.now())
}
// 比较过期时间
const isCheckTimeout = () => {
  // 用当前时间-登录时间>时效时间,大于0则代表过期
  const currentDate = Date.now()
  const loginTime = getTimeStamp()
  return currentDate - loginTime > SET_TIME_NEW
}
export {
  getTimeStamp,
  setTime,
  isCheckTimeout
}
