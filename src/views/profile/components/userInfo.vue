<!--
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-02-18 16:42:33
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-20 10:06:14
-->
<template>
  <div>
    <div class="user-container">
      <svg-icon
        class="user-avatar"
        style="
          font-size: 100px;
          box-shadow: 0 0 9px 1px #999;
          border-radius: 50%;
        "
        icon="user-icon"
      ></svg-icon>
      <div class="user-right-content">
        <p class="user-name">{{ $store.getters.userInfo.title }}</p>
        <p class="user-lavel">{{ $store.getters.userInfo.lavel }}</p>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="login-info">
      <div class="login-info-item">
        <span>上次登录时间:</span>
        <span>2022-02-18</span>
      </div>
      <div class="login-info-item">
        <span>上次登录地点:</span>
        <span>东莞</span>
      </div>
      <el-button @click="add">添加route</el-button>
      <el-button @click="deleteCLickl">删除</el-button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
console.log(router.getRoutes())
const add = () => {
  router.addRoute({
    name: 'about',
    path: '/about',
    component: () => import('@/views/user-manage/index')
  })
  console.log(router.getRoutes())
}
const deleteCLickl = () => {
  router.removeRoute('about')
  console.log(router.getRoutes())
}
</script>
<style lang='scss' scoped>
@import '~@/styles/common.scss';
.user-container {
  display: flex;
  align-items: center;
  .user-right-content {
    padding-left: 70px;
    .user-name {
      font-size: 30px;
      color: #222;
    }
    .user-lavel {
      margin-top: 5px;
      color: $color99;
    }
  }
}
.login-info {
  color: $color99;
  padding: 10px 0;
  .login-info-item {
    display: flex;
    align-items: center;
    span {
      &:nth-child(2) {
        padding-left: 70px;
      }
    }
  }
}
</style>
