<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown trigger="click" class="avatar-container">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
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
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
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
}
</style>
