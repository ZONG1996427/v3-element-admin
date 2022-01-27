<template>
  <el-dialog
    title="提示"
    width="22%"
    @close="handleClose"
    :model-value="modelValue"
  >
    <div class="center">
      <p class="title">请选择主题颜色</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="closed">取 消</el-button>
        <el-button size="mini" type="primary" @click="comfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
// 本组件使用了最新的v-model。父组件使用v-model='变量名',然后子组件可以使用:model-value='变量名'来默认接收
// 如果父组件是v-model:title='变量名' 那么子组件先在defineProps里面接收，然后再去使用
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
defineProps({
  modelValue: {
    type: Boolean
  }
})
const emits = defineEmits(['update:modelValue'])
const store = useStore()
// 颜色选择器绑定参数
const mColor = ref(store.getters.isCurrentColor)
// 默认选择的颜色数组
const predefineColors = ref([
  '#ff8c00',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
// 右上角关闭
const handleClose = () => {
  emits('update:modelValue', false)
}
// 关闭事件
const closed = () => {
  emits('update:modelValue', false)
}

// 确认事件
const comfirm = () => {
  closed()
  // 传入当前选中的color
  store.commit('theme/SET_CURRENT_COLOR', mColor.value)
}
</script>
<style lang='scss' scoped>
.center {
  text-align: center;
  .title {
    padding: 10px 0;
  }
}
</style>
