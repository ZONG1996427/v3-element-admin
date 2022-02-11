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
      placeholder="Please content"
      :remote-method="remoteMethod"
      default-first-option
      @change="headerSearchChange"
      :loading="loading"
      clearable
      @clear="optionsClear"
    >
      <el-option
        v-for="item in searchShowRoutesList"
        :key="item.path"
        :label="item.meta.handerSearchLabel.join(' > ')"
        :value="item.path"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const route = useRouter()
const store = useStore()
const isShow = ref(false) // 控制显示
const loading = ref(false) //
const searchVal = ref('') // 搜索参数
const showRoutesList = ref([]) // 原列表数据
const searchShowRoutesList = ref([]) // 搜索列表数据
onMounted(() => {
  // 递归过滤
  ;(function filterRoute(routes = []) {
    const showRoutes = []
    routes.forEach((item) => {
      if (item.meta.icon) {
        if (item.children && item.children.length > 0) {
          item.children = filterRoute(item.children)
        }
        if (item.meta.handerSearchLabel) {
          showRoutesList.value.push(item)
        }
        showRoutes.push(item)
      }
    })
    return showRoutes
  })(store.getters.menuList)
  searchShowRoutesList.value = JSON.parse(JSON.stringify(showRoutesList.value))
})
// 展开/收缩下拉框
const showSearchToggle = () => {
  isShow.value = !isShow.value
}
// 远程搜索
const remoteMethod = (val) => {
  loading.value = true
  searchShowRoutesList.value = showRoutesList.value.filter((item) => {
    return item.meta.name.includes(val) && item
  })
  loading.value = false
}
// 清除事件
const optionsClear = () => {
  searchShowRoutesList.value = JSON.parse(JSON.stringify(showRoutesList.value))
}
// 下拉框点击
const headerSearchChange = (val) => {
  route.push(val)
}
// 当点击其他区域关闭搜索，并清空输入框参数，复原下拉框数据
const onClose = () => {
  isShow.value = false
  searchVal.value = ''
  searchShowRoutesList.value = JSON.parse(JSON.stringify(showRoutesList.value))
}
// 监听isShow，点击事件
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
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
