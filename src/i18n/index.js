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

// var locale = 'en'
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
