/*
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-01-19 16:47:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 13:49:10
 */
// 导入path模块
const path = require('path')
// 判断环境
const isProduction = process.env.NODE_ENV !== 'development'
// 本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter'
  },
  // cdn的css链接
  css: [
    'https://cdn.jsdelivr.net/npm/element-plus/dist/index.css'
  ],
  // cdn的js链接
  js: [
    'https://cdn.bootcss.com/vue/3.2.0/vue.min.js',
    'https://cdn.jsdelivr.net/npm/element-plus',
    'https://cdn.bootcss.com/vuex/4.0.0-0/vuex.min.js',
    'https://cdn.bootcss.com/vue-router/4.0.0-0/vue-router.min.js'
  ]
}

// 标准的路径处理函数
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  productionSourceMap: false,

  // 添加proxy代理
  devServer: {
    // 转发地址
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/1d2f66ed7851fccaf05ec18b36cc744e/',
        changeOrigin: true // 开启跨域
      }
    }
  },

  chainWebpack(config) {
    // ============注入cdn start============
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn
      return args
    })
    // 设置 svg-sprite-loader
    // 插件的注入以及处理,这是chainWebpack的高级链式写法
    // 复习以下以下api的作用吧
    /**
     * rule() 条件匹配
     * exclude.add 添加文件路径
     * end() 结束此段匹配
     * test() 正则匹配文件夹里的文件
     * loader 加载的模块
     * options 参数
     */
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .end()
  },
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals
  }
}
