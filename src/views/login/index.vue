<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3>用户登录</h3>
      </div>
      <!-- 用户名 -->
      <el-form-item>
        <span class="svg-container">
          <el-icon><Avatar /></el-icon>
        </span>
        <el-input placeholder="用户名" name="name" type="text"></el-input>
      </el-form-item>
      <!-- 密码-->
      <el-form-item>
        <span class="svg-container">
          <el-icon><Avatar /></el-icon>
        </span>
        <el-input placeholder="passworld" name="passworld"></el-input>
        <span class="show-pwd">
          <el-icon><Avatar /></el-icon>
        </span>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-bottom: 30px"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { Avatar } from '@element-plus/icons'
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .title-container {
      position: relative;
      text-align: center;
      margin-bottom: 10px;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }

    .show-pwd {
      position: absolute;
      top: 6px;
      right: 15px;
      color: $dark_gray;
      user-select: none;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
  }
}
</style>
