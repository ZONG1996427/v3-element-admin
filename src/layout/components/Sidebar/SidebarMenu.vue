<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :uniqueOpened="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <SubMenu :menuList="menuList" />
  </el-menu>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import SubMenu from './SubMenu.vue'
const store = useStore()
console.log(store.getters.menuList)
const menuList = computed(() => {
  return store.getters.menuList
})
</script>
<style lang='scss' scoped>
</style>
