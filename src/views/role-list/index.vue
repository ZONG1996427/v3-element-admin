<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
    >
      <el-icon class="el-icon--upload" style="font-size: 80px"
        ><upload-filled
      /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup>
import {} from 'vue'
import { UploadFilled } from '@element-plus/icons'
</script>

<style lang="scss" scoped></style>
