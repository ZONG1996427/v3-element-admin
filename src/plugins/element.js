import store from '@/store'
import ELEMENT from 'element-plus'
import 'element-plus/theme-chalk/index.css'
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import en from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
export default app => {
  app.use(ELEMENT, {
    locale: store.getters.language === 'en' ? en : zhCn
  })
}
