<!--
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-01-27 10:01:18
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-21 16:13:52
-->
<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip class="without-outline" content="国际化" :effect="effect">
        <svg-icon id="guide-lang" icon="language"></svg-icon
      ></el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { computed, defineProps } from 'vue'
const store = useStore()
const i18n = useI18n()
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
const language = computed(() => store.getters.language)
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  store.commit('app/SET_LANGUAGE', lang)
  ElMessage.success(i18n.t('toast.switchLangSuccess'))
}
</script>
<style lang='scss' scoped>
</style>
