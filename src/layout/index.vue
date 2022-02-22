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
      <div :class="{ 'fixed-header': isFixedHeader }">
        <Navbar />
        <tagView />
      </div>
      <AppMain></AppMain>
    </div>
    <!-- <div class="handle-button" style="top: 250px; background-color: #1890ff">
      <i class="el-icon-setting" @click.stop="openDrawer"></i>
    </div> -->
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar/index'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
import tagView from '@/components/tagView'
// const openDrawer = () => {}
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
  position: absolute;
  right: 0;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
}
</style>
