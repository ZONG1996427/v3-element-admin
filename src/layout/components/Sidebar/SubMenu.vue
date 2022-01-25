<template>
  <div>
    <div v-for="(item, index) in menuList" :key="index">
      <el-submenu
        :index="item.path"
        v-if="item.children && item.children.length"
      >
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
        <template #title>
          <i
            class="svg-icon"
            v-if="item.meta.icon.includes('el-icon')"
            :class="item.meta.icon"
          ></i>
          <svg-icon v-else :icon="item.meta.icon"></svg-icon>
          <span>{{ item.meta.name }}</span>
        </template>
      </el-menu-item>
    </div>
  </div>
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
