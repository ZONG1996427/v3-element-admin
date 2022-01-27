// 引入i18n
import { createI18n } from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'
import store from '@/store'
const messages = {
  en: {
    ...en
  },
  zh: {
    ...zh
  }
}

// 取出来当前语言类型并赋值，这样就可以即使刷新页面也可以保留当前页面语言类型了
function getLanguage() {
  return store && store.getters && store.getters.language
}
// 返回一个实例，然后进行对象配置
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages
})
export default i18n
