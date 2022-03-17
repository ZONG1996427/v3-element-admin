<template>
  <div>
    <el-drawer
      size="250px"
      v-model="isOpenDrawer"
      title="系统布局配置"
      @close="closeDrawer"
    >
      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch v-model="isFixedHeader" @change="isFixedHeaderChange" />
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { defineProps, watch, ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const store = useStore()
const isOpenDrawer = ref(false)
const isFixedHeader = ref(false)
const props = defineProps({
  openDrawerStatus: {
    type: Boolean
  }
})
watch(
  () => props.openDrawerStatus,
  (newVal) => {
    isOpenDrawer.value = newVal
  }
)
const emits = defineEmits(['update:openDrawerStatus'])
const isFixedHeaderChange = (value) => {
  store.commit('settings/SET_HEADERS_FIX', value)
  if (value) {
    ElMessage({
      message: '开启固定 Header后会导致引导功能空白，请悉知',
      type: 'warning'
    })
  }
}
const closeDrawer = () => {
  emits('update:openDrawerStatus', false)
}
</script>
<style lang='scss' scoped>
.drawer-item {
  display: flex;
  justify-content: space-between;
}
</style>
