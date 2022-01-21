<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginForm"
      :model="loginFrom"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3>用户登录</h3>
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="用户名"
          name="name"
          type="text"
          v-model="loginFrom.username"
        ></el-input>
      </el-form-item>
      <!-- 密码-->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="passwordType"
          v-model="loginFrom.password"
        ></el-input>
        <span class="show-pwd">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="passwordTypeChange"
          ></svg-icon>
        </span>
      </el-form-item>
      <el-button
        @click="loginChange"
        type="primary"
        :loading="loginLoading"
        style="width: 100%; margin-bottom: 30px"
        >登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatorPassWord } from './rules'
const loginFrom = ref({
  username: 'admin',
  password: '123456'
})
const loginRules = ref({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorPassWord()
    }
  ]
})
// 处理显示/隐藏密码
const passwordType = ref('password')
const passwordTypeChange = () => {
  passwordType.value === 'password'
    ? (passwordType.value = 'text')
    : (passwordType.value = 'password')
}
const store = useStore()
// 通过ref声明一个实例出来,注意,这个命名要跟元素的ref一样菜下
const loginForm = ref(null)
const loginLoading = ref(false)
const loginChange = () => {
  // 校验是否通过
  loginForm.value.validate((vaild) => {
    if (!vaild) return
    loginLoading.value = true
    store.dispatch('user/login', loginFrom.value).finally(() => {
      // 接口成功/失败后loding状态取消
      loginLoading.value = false
    })
  })
  // store.dispatch('user/getUserInfo')
}
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
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
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
      right: 15px;
      top: 7px;
      color: $dark_gray;
      user-select: none;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
  }
}
</style>
