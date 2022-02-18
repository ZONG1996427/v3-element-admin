<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPanes">
      <router-link
        class="tags-view-item"
        v-for="(item, index) in $store.getters.tagViewList"
        :ref="(el) => (tags[index] = el)"
        :key="item.path"
        :to="{
          path: item.fullPath
        }"
        :class="isActive(item) && $store.getters.currentRoute ? 'active' : ''"
        @click="checkRouteClick(item)"
        @contextmenu.prevent="contextmenuClick($event, index, item)"
        :style="{
          backgroundColor:
            isActive(item) && $store.getters.currentRoute
              ? $store.getters.cssVar.menuBg
              : '',
          color: isActive(item) && $store.getters.currentRoute ? '#ffffff' : ''
        }"
      >
        {{ generateTitle(item.meta.title) }}
        <i
          v-show="item.path !== '/profile'"
          class="el-icon-close"
          @click.prevent.stop="onCloseClick(item, index)"
        />
      </router-link>
    </scroll-pane>
  </div>
  <ul class="context-menu" v-show="closeMenuVisibility" :style="closeMenu">
    <li @click="refresh">{{ $t('tagView.refresh') }}</li>
    <li
      @click="closeCurrent"
      v-show="
        Object.keys(closeSelectItem).length && !closeSelectItem.meta.affix
      "
    >
      {{ $t('tagView.closeCurrent') }}
    </li>
    <li @click="closeAll">{{ $t('tagView.closeAll') }}</li>
    <li @click="closeOther">{{ $t('tagView.closeOther') }}</li>
  </ul>
</template>

<script setup>
// 首页不允许删除
// 删除当前，跳到前面一个
import { ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'
import ScrollPane from './ScrollPane'
const route = useRoute()
const router = useRouter()
const store = useStore()
const scrollPanes = ref(null)
const tags = ref([])
const closeMenuVisibility = ref(false)
const closeSelectIndex = ref(0) // 关闭选中的下标
const closeSelectItem = ref({}) // 关闭选中的页面

watch(route, () => {
  tagViewChangeWatch(route)
})
// 是否是当前选中的路由
const isActive = (item) => {
  return route.path === item.path
}
const checkRouteClick = (item) => {
  tagViewChangeWatch(item)
  router.push(item.path)
}
/**
 * @name: tagViewChangeWatch
 * @msg: tag标签变化，移动标签
 * @param {*} item 当前点击的路由
 */
const tagViewChangeWatch = (item) => {
  nextTick(() => {
    // 删除之后获取的el会出现null，先暂时过滤一下，后面在康康
    tags.value = tags.value.filter((x) => {
      return x
    })
    for (const tag of tags.value) {
      if (tag.to.path === item.path) {
        scrollPanes.value.moveToTarget(tag, tags.value)
      }
    }
  })
}
// 删除tag标签，并修改缓存
const onCloseClick = (item, index) => {
  store.commit('tagView/DELETE_TAG_VIEW', index)
  // 删除当前的，跳转到前一个页面
  if (item.path === store.getters.currentRoute) {
    router.push(store.getters.tagViewList[index - 1].path)
  }
}
const closeMenu = ref({
  left: 0,
  top: 0
})
// 右键点击关闭，获取页面位置，显示关闭系列按钮
const contextmenuClick = (e, index, item) => {
  // 获取右键点击处距离页面top，left的距离
  const { x, y } = e
  closeMenu.value.left = x + 'px'
  closeMenu.value.top = y + 'px'
  closeMenuVisibility.value = true
  closeSelectIndex.value = index
  closeSelectItem.value = item
}
// 刷新
const refresh = () => {
  router.go(0)
}
// 关闭当前
const closeCurrent = () => {
  store.commit('tagView/DELETE_TAG_VIEW', closeSelectIndex.value)
  // 删除当前的，跳转到前一个页面
  if (route.path === store.getters.currentRoute) {
    router.push(store.getters.tagViewList[closeSelectIndex.value - 1].path)
  }
}
// 关闭所有,除了个人中心
const closeAll = () => {
  store.commit('tagView/DELETE_ALL_TAG')
  router.push('/profile')
}
// 关闭其他，只保留当前跟不可删除页面
const closeOther = () => {
  store.commit('tagView/DELETE_OTHER_TAG', closeSelectItem.value)
  router.push(closeSelectItem.value.path)
}
// 关闭 menu
const closeWatch = () => {
  closeMenuVisibility.value = false
}
// 监听变化
watch(closeMenuVisibility, (val) => {
  if (val) {
    document.body.addEventListener('click', closeWatch)
  } else {
    document.body.removeEventListener('click', closeWatch)
  }
})
</script>
<style lang='scss' scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
.context-menu {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
