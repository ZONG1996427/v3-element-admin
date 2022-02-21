<!--
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-01-21 14:19:04
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-21 16:01:26
-->
<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup>
// 在main侦听路由的变化，
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { isTag } from '@/utils/tag'
const route = useRoute()
const store = useStore()
watch(
  route,
  (to, from) => {
    // 退出/token过期
    if (to.path === '/login') {
      store.commit('tagView/CLEAR_TAG_DATA')
    }
    // 如果点击的是白名单的路由，不走下面 || 404 || 不存在的
    if (
      !isTag(to.path) ||
      (to.meta && to.meta.title === '404') ||
      !Object.keys(to.meta).length
    ) {
      return
    }
    // 调用tagView模块的方法,并且传入一些我们需要的参数
    const { path, meta, fullPath, params, query } = to
    store.commit('tagView/ADD_TAG_VIEW_LIST', {
      path,
      meta,
      fullPath,
      params,
      query
    })
  },
  {
    // 首次加载时就调用一次
    immediate: true
  }
)
</script>
<style lang='scss' scoped>
.app-main {
  min-height: calc(100vh - 88px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 15px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
