const validatorPassWord = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码不可以小于6位数'))
    } else {
      callback()
    }
  }
}
export {
  validatorPassWord
}
