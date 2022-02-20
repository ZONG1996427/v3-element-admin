/*
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-01-19 16:47:14
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-20 08:51:14
 */
// 导入path模块
const path = require('path')

// 标准的路径处理函数
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  // 添加proxy代理
  devServer: {
    // 转发地址
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/1d2f66ed7851fccaf05ec18b36cc744e/',
        // changeOrigin: true // 开启跨域,解决gitee部署跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
    // proxy: {
    //   '/api': {
    //     target: 'http://backend-api-02.newbee.ltd/manage-api/v1',
    //     changeOrigin: true // 开启跨域,解决gitee部署跨域
    //   }
    // }
  },

  chainWebpack(config) {
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
  }
}
