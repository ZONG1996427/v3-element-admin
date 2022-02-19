<template>
  <div class="navbar">
    <Hamburger class="Hamburger" />
    <Breadcrumb id="guide-breadcrumb" class="breadcrumb" />
    <div class="right-menu">
      <Guidance class="theme-select" />
      <header-search id="guide-search" class="theme-select" />
      <screenfull id="guide-full" class="theme-select" />
      <theme-select class="theme-select" />
      <lang-select class="right-menu-item hover-effect" />
      <el-dropdown trigger="click" class="avatar-container">
        <div class="avatar-wrapper">
          <svg-icon
            style="
              font-size: 40px;
              box-shadow: 0 0 3px 1px #999;
              border-radius: 5px;
            "
            icon="user-icon"
          ></svg-icon>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import Hamburger from './hamburger.vue'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import ThemeSelect from '@/components/ThemeSelect'
import screenfull from '@/components/Screenfull'
import headerSearch from '@/components/Headersearch'
import Guidance from '@/components/Guidance'

const store = useStore()
// 退出
const logout = () => {
  store.dispatch('user/logout')
}
</script>
<style lang='scss' scoped>
.navbar {
  width: 100%;
  height: 54px;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .Hamburger {
    float: left;
    height: 100%;
    line-height: 54px;
    transition: background 0.5s;

    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .right-menu {
    ::v-deep .theme-select {
      margin-right: 20px;
      font-size: 24px;
      background-color: #fff;
      padding-top: 4px;
      border: none;

      &:active {
        border: none !important;
        outline: 0 !important;
      }
    }

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 20px 0 0;
      font-size: 28px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    display: flex;
    align-items: center;
    float: right;
    // flex-direction: row-reverse;
    padding-right: 16px;

    .avatar-container {
      margin-right: 20px;

      .avatar-wrapper {
        margin-top: 6px;

        ::v-deep .el-icon-s-tools {
          margin-left: 15px;
        }
      }
    }
  }

  .breadcrumb {
    float: left;
  }
}
</style>
