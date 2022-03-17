<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <!-- 在做面包屑时，key一定要绑定path，否则会出现动画无效的bug -->
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{
          generateTitle(item.meta.title)
        }}</span>
        <span class="redirect" @click.prevent="RouteClick(item)" v-else>{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
// 切换菜单栏中英文
const generateTitle = (title) => {
  return i18n.t('route' + '.' + title)
}
const route = useRoute()
const breadcrumbData = ref([])
// 获取当前面包屑层级
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (v) => v.meta.name && v.meta.title
  )
}
// 侦听路由
watch(
  route,
  () => {
    // toute有变化，就调用方法
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
const router = useRouter()
const RouteClick = (item) => {
  router.push(item.path)
}
</script>
<style lang='scss' scoped>
@import '~@/styles/variables.scss';
.breadcrumb {
  line-height: 50px;
  margin-left: 8px;
  font-size: 14px;
  .redirect {
    // 可点击的面包屑样式
    cursor: pointer;
    color: $subMenuBg; // 也设置成主题色，随着主题变化
  }
  ::v-deep .no-redirect {
    //最后一个面包屑，不可以点击
    color: #97a8be;
    cursor: text;
  }
}
</style>
