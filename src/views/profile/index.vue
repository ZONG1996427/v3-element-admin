<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover" style="margin: 0 5px">
          <UserInfo />
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover" style="margin: 0 5px"> Hover </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import UserInfo from './components/userInfo'
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
