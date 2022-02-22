<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover" style="margin: 0 5px">
          <UserInfo />
        </el-card>
        <el-card shadow="hover" style="margin: 15px 5px">
          <LangDetails />
        </el-card>
      </el-col>
      <el-col :span="16">
        <ShowData />
        <el-card shadow="hover" style="margin: 15px 5px 0 5px">
          <Agenda />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import UserInfo from './components/userInfo'
import ShowData from './components/showData'
import LangDetails from './components/LangDetails'
import Agenda from './components/agenda'
import {} from 'vue'
</script>

<style lang="scss" scoped>
.title {
  padding: 8px 0;
  border-bottom: 1px solid #dcdfe6;
}
</style>
