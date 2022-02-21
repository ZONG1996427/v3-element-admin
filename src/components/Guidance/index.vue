<template>
  <div>
    <el-tooltip content="引导页" class="without-outline">
      <svg-icon
        style="font-size: 21px"
        icon="icon-guide"
        @click.stop="guideClick"
      ></svg-icon>
    </el-tooltip>
  </div>
</template>
<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './steps'
const i18n = useI18n()

let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    opacity: 0.75,
    closeBtnText: i18n.t('guide.close'),
    nextBtnText: i18n.t('guide.next'),
    prevBtnText: i18n.t('guide.prev')
  })
})
const guideClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>
<style lang='scss' scoped>
</style>
