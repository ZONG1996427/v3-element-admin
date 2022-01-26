<template>
  <template v-for="(item, index) in menuList" :key="index">
    <el-submenu :index="item.path" v-if="item.children && item.children.length">
      <template #title>
        <i
          class="svg-icon"
          v-if="item.meta.icon.includes('el-icon')"
          :class="item.meta.icon"
        ></i>
        <svg-icon v-else :icon="item.meta.icon"></svg-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <!-- 循环渲染 -->
      <Sub-Menu :menuList="item.children"></Sub-Menu>
    </el-submenu>
    <el-menu-item v-else :index="item.path">
      <!-- el-menu-item里面直接写显示在页面的元素就行，不要再嵌套，否则会出现如下情况，菜单只有一级，在收缩的时候不显示icon -->
      <i
        class="svg-icon"
        v-if="item.meta.icon.includes('el-icon')"
        :class="item.meta.icon"
      ></i>
      <!-- 路由名称要用template嵌套,否则会有bug -->
      <template #title>
        <span>{{ item.meta.name }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  menuList: {
    type: Array,
    default: () => {
      return []
    }
  }
})
</script>
<style lang='scss' scoped>
</style>
