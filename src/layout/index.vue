<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- sidebar区域 -->
    <div
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    >
      <Sidebar></Sidebar>
    </div>
    <div class="main-container">
      <div :class="{ 'fixed-header': $store.getters.isFixedHeader }">
        <Navbar />
        <tagView />
      </div>
      <AppMain></AppMain>
    </div>
    <div
      class="handle-button"
      style="top: 250px; background-color: #1890ff"
      @click.stop="openDrawer"
    >
      <i class="el-icon-setting"></i>
    </div>
    <Drawer v-model:openDrawerStatus="openDrawerStatus" />
    <el-backtop />
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar/index'
import Drawer from './components/Drawer'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
import tagView from '@/components/tagView'
import { ref } from 'vue'
const openDrawerStatus = ref(false)
const openDrawer = () => {
  openDrawerStatus.value = !openDrawerStatus.value
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  width: 100%;
  height: 100%;
  position: relative;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hiddensideBarWidth});
}
.handle-button {
  width: 48px;
  height: 48px;
  position: fixed;
  right: 0;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 9999;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
}
.drawer-item {
  display: flex;
  justify-content: space-between;
}
</style>
