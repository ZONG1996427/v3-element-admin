import { createStore } from 'vuex'
import user from './modules/user'
// 模块单个引入，后面还是用require.context()方法遍历
export default createStore({
  modules: {
    user
  }
})
