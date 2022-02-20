<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginForm"
      :model="loginFrom"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3>{{ $t('login.title') }}</h3>
        <langSelect class="langSelect" />
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          :placeholder="$t('login.userPlaceholder')"
          name="name"
          type="text"
          v-model="loginFrom.username"
          @keydown.enter="loginChange"
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
          @keydown.enter="loginChange"
        ></el-input>
        <span class="show-pwd">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="passwordTypeChange"
          ></svg-icon>
        </span>
      </el-form-item>
      <el-button
        @keydown.enter="loginChange"
        @click="loginChange"
        type="primary"
        :loading="loginLoading"
        style="width: 100%; margin-bottom: 30px"
        >{{ $t('login.loginBtn') }}
      </el-button>
      <span style="color: #ffffff">
        <div>超级管理员账号:super-admin 密码随便填</div>
        <div style="margin-top: 20px">普通账号:admin 密码随便填</div>
        <div style="margin-top: 20px">
          tag-view账号:tag-view-admin 密码随便填
        </div>
      </span>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatorPassWord } from './rules'
import { setItem } from '@/utils/storeage'
import { USERNAME } from '@/constant/index'
import langSelect from '@/components/LangSelect'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const loginFrom = ref({
  username: 'super-admin',
  password: '123456'
})
const loginRules = ref({
  username: [
    {
      required: true,
      message: i18n.t('login.usernameRule'),
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
    store
      .dispatch('user/login', loginFrom.value)
      .finally(() => {
        // 接口成功/失败后loding状态取消
        loginLoading.value = false
      })
      .then(() => {
        setItem(USERNAME, loginFrom.value.username)
      })
  })
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
      font-weight: bold;

      ::v-deep .langSelect {
        position: absolute;
        top: 10px;
        right: 0;
        background-color: #fff;
        font-size: 20px;
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;
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
