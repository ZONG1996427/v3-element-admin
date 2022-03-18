/*
 * @Author: your name
 * @Date: 2022-02-24 11:03:51
 * @LastEditTime: 2022-03-18 14:16:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \升级vite版本备份\src\main.js
 */
import { createApp } from 'vue'

// 引入国际化
import i18n from './i18n'
import installElementPlus from './plugins/element'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css' // nprogress样式
// 导入 svgIcon
import installIcons from '@/icons'
// 导入全局样式
import './styles/index.scss'
// 引入路由权限文件
import './premission.js'
// 设置全局
// 时间插件
import moment from 'moment'
const app = createApp(App)
app.config.globalProperties.$moment = moment
installElementPlus(app)
installIcons(app)
app
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
