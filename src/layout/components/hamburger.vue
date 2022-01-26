<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>
<script setup>
// 展开/收缩两种图标，通过计算属性处理
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
// 切换图标
const toggleClick = () => {
  // 直接调用aop modules里面的方法
  store.commit('app/triggerSidebarOpened')
}
</script>
<style lang='scss' scoped>
.hamburger-container {
  padding: 0 16px;
  vertical-align: middle;
  .hamburger {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
}
</style>
