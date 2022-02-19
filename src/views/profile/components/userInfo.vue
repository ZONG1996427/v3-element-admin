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
    </div>
  </div>
</template>
<script setup>
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
