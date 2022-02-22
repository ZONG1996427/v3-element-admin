
<template>
  <div style="height: 418px">
    <p class="title">今日任务</p>
    <el-table :show-header="false" :data="todoList" style="width: 100%">
      <el-table-column width="40">
        <template #default="scope">
          <el-checkbox v-model="scope.row.status"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <div
            class="todo-item"
            :class="{
              'todo-item-del': scope.row.status
            }"
          >
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const todoList = ref([
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: true
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: true
  }
])
</script>
<style lang='scss' scoped>
.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
</style>
