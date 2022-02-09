<template>
  <!-- 必须加v-bind='$attrs' 接收父组件的参数不进行props定义，否则样式无效 -->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip content="换肤">
        <svg-icon icon="change-theme"></svg-icon
      ></el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">主题换肤</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div>
    <seleColor v-model="openSelecolor" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import seleColor from './selectColor.vue'
const openSelecolor = ref(false)
const handleSetTheme = () => {
  openSelecolor.value = true
}
</script>
<style lang='scss' scoped>
</style>
