<!--
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-01-22 17:04:28
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-20 20:14:24
-->
<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover" style="margin: 0 5px">
          <UserInfo />
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover" style="margin: 0 5px"> 开发中。。。 </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import UserInfo from './components/userInfo'
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
