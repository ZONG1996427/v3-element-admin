<template>
  <div>
    <el-drawer
      v-model="drawer"
      title="I am the title"
      :direction="direction"
      :before-close="handleClose"
    >
      <span>Hi, there!</span>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>
<style lang='scss' scoped>
</style>
