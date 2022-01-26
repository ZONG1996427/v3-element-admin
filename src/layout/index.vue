<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- sidebar区域 -->
    <div
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    >
      <Sidebar></Sidebar>
    </div>
    <div class="main-container">
      <div class="fixed-header">
        <Navbar />
      </div>
      <AppMain></AppMain>
    </div>
    <!-- navbar区域 -->
    <!-- main区域 -->
  </div>
</template>

<script setup>
import {} from 'vue'
import Sidebar from './components/Sidebar/index'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
import variables from '@/styles/variables.scss'
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
</style>
