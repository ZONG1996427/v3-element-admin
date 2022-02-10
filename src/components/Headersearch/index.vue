<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon="search"
      @click.stop="showSearchToggle"
    ></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="searchVal"
      filterable
      remote
      reserve-keyword
      placeholder="Please content"
      :remote-method="remoteMethod"
      default-first-option
    >
      <el-option
        v-for="item in route.getRoutes()"
        :key="item.path"
        :label="item.meta.name"
        :value="item.path"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()
console.log(route.getRoutes())
const isShow = ref(false)
const searchVal = ref('')
// const optionsList = ref([])
const showSearchToggle = () => {
  console.log('show search')
  isShow.value = !isShow.value
}
const remoteMethod = () => {
  console.log('remote method')
}
</script>
<style lang='scss' scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
