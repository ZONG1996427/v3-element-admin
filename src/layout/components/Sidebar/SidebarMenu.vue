<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <SubMenu :menuList="menuList" />
  </el-menu>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SubMenu from './SubMenu.vue'
const store = useStore()
const menuList = computed(() => {
  return store.getters.menuList
})
const route = useRoute()
// 刷新页面记住当前点击页，这是借用新方法来实现，往常都是定一个变量放在vuex中或者
// data中，然后点击事件后存储到local中，然后created再取出来进行赋值
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
<style lang='scss' scoped>
</style>
