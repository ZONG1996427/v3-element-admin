<!--
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-02-21 16:33:19
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-21 17:32:00
-->
<template>
  <div class="el-rows">
    <div class="el-cols">
      <i class="el-icon-user icon-init"></i>
      <div class="data-item">
        <div>1234</div>
        <div>用户访问量</div>
      </div>
    </div>
    <div class="el-cols">
      <i class="el-icon-bell icon-init"></i>
      <div class="data-item">
        <div>321</div>
        <div>系统信息</div>
      </div>
    </div>
    <div class="el-cols">
      <i class="el-icon-star-off icon-init"></i>
      <div class="data-item">
        <div>1234</div>
        <div>数量</div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang='scss' scoped>
.el-rows {
  display: flex;
  align-items: center;
  margin-left: -5px;
  margin-right: -5px;
}
.el-icon-user {
  background-color: #2d8cf0;
}
.el-icon-bell {
  background-color: #2d8cf0;
}
.el-icon-star-off {
  background-color: #f25e43;
}
.icon-init {
  font-size: 50px;
  color: #ffffff;
  padding: 20px;
}
.el-cols {
  width: 33%;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  align-items: center;
  // padding: 0 10px;
  margin: 0 10px;
  background-color: #fff;
  box-sizing: border-box;
}
.data-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
  > div:nth-child(1) {
    font-size: 30px;
    color: #2d8cf0;
  }
}
</style>
