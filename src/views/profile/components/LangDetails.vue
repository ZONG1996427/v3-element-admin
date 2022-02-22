<template>
  <div>
    <p class="title">语言详情</p>
    <div
      class="progress-content"
      v-for="item in percentageList"
      :key="item.value"
    >
      <p>{{ item.type }}</p>
      <el-progress :percentage="item.value" :color="item.color" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const percentageList = ref([
  {
    type: 'VUE3',
    value: 85,
    color: '#409eff'
  },
  {
    type: 'React',
    value: 65.5,
    color: '#67c23a'
  },
  {
    type: 'Typescript',
    value: 20.7,
    color: '#f56c6c'
  },
  {
    type: 'HTML',
    value: 15,
    color: '#e6a23c'
  }
])
</script>
<style lang='scss' scoped>
.title {
  padding: 8px 0;
  border-bottom: 1px solid #dcdfe6;
}
.progress-content {
  margin-top: 20px;
}
</style>
