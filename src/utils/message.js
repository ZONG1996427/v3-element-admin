import { ElMessage } from 'element-plus'

const messageTip = (type, content, duration = 1500) => {
  return ElMessage({
    message: content,
    type,
    duration
  })
}
export {
  messageTip
}
