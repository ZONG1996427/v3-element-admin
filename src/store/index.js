import { createStore } from 'vuex'
import getters from './getters'

// 动态导入，如果用vite需要改，因为require.context是webpack的方法，vite是import.meta.globEager()
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  getters,
  modules
})
