// 相当于vuex的计算属性，将所有模块的state进行集合，方便页面调用
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo
}

export default getters
