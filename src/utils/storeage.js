
// 设置
export const setItem = (key, value) => {
  console.log(key)
  console.log(value)
  if (typeof value === 'object') {
    // 进行转换成字符串
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}
// 删除单个
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
// 删除全部
export const removeAllItem = () => {
  window.localStorage.clear()
}
