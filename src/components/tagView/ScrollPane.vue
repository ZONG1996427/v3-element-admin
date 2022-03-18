<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
  >
    <slot />
  </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4

export default {
  name: 'ScrollPane',
  data() {
    return {
      left: 0
    }
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap
    }
  },
  methods: {
    /**
     * @name: moveToTarget
     * @msg: 标签移动核心代码,其他可以不用
     *  api定义:
     * scrollLeft:属性设置或返回元素内容向左滚动(水平方向)的像素数。当前可视窗口距离距离左侧某元素的距离
     * offsetWidth:获取元素的宽度，包含内边距（padding）和边框（border）。
     * scrollWidth：获取元素的宽度，包含内边距（padding）
     * @param {*}
     * @return {*}
     */
    moveToTarget(currentTag, parentTagList) {
      const $container = this.$refs.scrollContainer.$el // 标签容器
      const $containerWidth = $container.offsetWidth // tag元素当前可视的宽度
      const $scrollWrapper = this.scrollWrapper
      const tagList = parentTagList // 所有tag标签实例
      let firstTag = null // 当前tagList的第一条
      let lastTag = null // 当前tagList的最后一条
      // 长度大于0时，获取数组的第一个标签跟最后一个标签
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }
      // 当第一条数据跟当前选中的一样时，元素距离左侧滚动的距离为0
      if (firstTag.to.path === currentTag.to.path) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag.to.path === currentTag.to.path) {
        // 点击左侧菜单可以让标签移动
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(
          (item) => item.to.path === currentTag.to.path
        )
        const prevTag = tagList[currentIndex - 1] // 当前选中的下一个兄弟标签
        const nextTag = tagList[currentIndex + 1] // 当前选中的上一个兄弟标签
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing

        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
