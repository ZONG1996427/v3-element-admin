<template>
  <div>
    <div class="sideBar-header-container">
      <img src="../../../icons/svg/YYDS.jpg" alt="YYDS" />
      <p v-if="$store.getters.sidebarOpened">v3-admin</p>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import SidebarMenu from './SidebarMenu.vue'
</script>
<style lang='scss' scoped>
.sideBar-header-container {
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 42px;
    height: 42px;
    border-radius: 5px;
  }
  p {
    color: #fff;
    font-size: 14px;
    padding-left: 10px;
    white-space: nowrap; // 添加不换行，否则点展开/伸缩图标会出现文字挤压展开的效果
  }
}
</style>
