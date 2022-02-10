<template>
  <div @click="screenToggle">
    <svg-icon
      :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

const isFullScreen = ref(false)
const screenToggle = () => {
  screenfull.toggle()
}
// 监听变化
const change = () => {
  isFullScreen.value = screenfull.isFullscreen
}
// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})
// 页面卸载时删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
<style lang='scss' scoped>
</style>
