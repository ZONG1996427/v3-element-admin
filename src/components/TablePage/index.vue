
<template>
  <el-card>
    <div class="tablePage-container">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item
          v-for="item in searchColumns"
          :key="item.prop"
          :label="item.label"
        >
          <template v-if="item.type === 'input'">
            <el-input
              size="small"
              v-model="form[item.prop]"
              placeholder="请输入"
              clearable
            ></el-input>
          </template>
          <template v-if="item.type === 'select'">
            <el-select
              clearable
              size="small"
              v-model="form[item.prop]"
              placeholder="请选择"
            >
              <el-option
                v-for="options in item.options"
                :key="options.value"
                :label="options.label"
                :value="options.value"
              ></el-option>
            </el-select>
          </template>
          <!-- 如需配置时间选择器，区间选择器等在这加就可以了 -->
        </el-form-item>
        <el-form-item>
          <!-- <el-button
            size="small"
            type="primary"
            @click="queryData"
            :loading="queryLoading"
            >查询</el-button
          >
          <el-button size="small" @click="reSetData" :loading="resetLoading"
            >重置</el-button
          > -->
          <el-button
            v-for="item in props.buttonList"
            :key="item.type"
            size="small"
            :loading="buttonLoading[item.type]"
            :type="item.style"
            @click="item.click"
            >{{ item.text }}</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        v-loading="tableDataloading"
        :data="tableData"
        show-overflow-tooltip
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed="left"
          v-if="isSelection"
          type="selection"
          width="55"
        />
        <el-table-column
          v-for="{ render, id, label, prop, width, click } in costomColumns"
          :key="id"
          :label="label"
          :prop="prop"
          :width="width"
        >
          <template #default="scope" v-if="render">
            <div v-html="render(scope)" @click="click(scope)"></div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          :width="props.operationWidth"
          v-if="props.operationList.length"
        >
          <template #default="scope">
            <el-button
              v-for="item in operationList.filter((x) => {
                return !(x.hidden && x.hidden(scope))
              })"
              :key="item.name"
              type="text"
              size="small"
              @click="item.click(scope)"
            >
              {{ item.name }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pages-container"
        v-model:currentPage="page.currentPage"
        v-model:page-size="page.pageSize"
        :page-sizes="[10, 20, 50]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </el-card>
</template>
<script setup>
import { ref, defineProps, onMounted, defineExpose, defineEmits } from 'vue'
const page = ref({
  total: 0,
  pageSize: 10,
  currentPage: 1
})
const small = ref(false)
const background = ref(false)
const tableData = ref([]) // 列表数据
const tableDataloading = ref(false) // tableloading
const buttonLoading = ref({}) // tableloading

// const renderButton = {
//   render: (data) => {
//     console.log(data.$attrs)
//     return h(
//       data.$attrs.document.content(data.$attrs.scope),
//       // data.$attrs.document
//       // // 1. 要渲染的标签名称：第一个参数【必需】
//       data.$attrs.document.element,
//       // 2. 渲染标签的属性：第二个参数【可选】
//       {
//         style: data.$attrs.document.style,
//         class: data.$attrs.class,
//         id: data.$attrs.id,
//         onClick: () => {
//           // 数据返现到父组件
//           data.$attrs.document.click(data.$attrs.scope)
//         }
//       },
//       // 3. 渲染标签的子元素数组：第三个参数【可选】
//       [
//         // "render函数文本" 文本内容可以直接写入
//         h('p', 233) // h()创建的VNodes
//       ]
//     )
//   }
// }
const form = ref({}) // 查询条件form
const props = defineProps({
  // 操作栏宽度
  operationWidth: {
    default: 100
  },
  // 操作栏
  operationList: {
    default: () => {
      return [
        {
          name: '编辑',
          hidden: false,
          click: (row) => {}
        },
        {
          name: '删除',
          hidden: false,
          click: (row) => {}
        }
      ]
    },
    type: Array
  },
  // 是否显示多选框
  isSelection: {
    default: false,
    type: Boolean
  },
  // 查询条件
  searchColumns: {
    default: () => {
      return []
    },
    type: Array
  },
  // 展示列字段配置
  costomColumns: {
    default: () => {
      return []
    },
    type: Array
  },
  // 查询条件按钮配置
  buttonList: {
    default: () => {
      return [
        {
          type: 'query',
          text: '查询',
          style: 'primary'
        },
        {
          type: 'reset',
          text: '重置'
        }
      ]
    },
    type: Array
  },
  // 列表接口，包含获取列表，删除，详情，编辑等
  tableUrl: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const disabled = ref(false)
onMounted(() => {
  if (props.buttonList.length) {
    initButtonLoading()
  }
  getTableData()
  initForm('resetLoading')
})
// 初始化查询条件配置按钮loading
const initButtonLoading = () => {
  props.buttonList.forEach((x) => {
    // ref创建的响应式对象不能直接 对象.hasOwnProperty('key')
    if (
      !Object.prototype.hasOwnProperty.call(buttonLoading.value, `${x.type}`)
    ) {
      buttonLoading.value[x.type] = false
    }
  })
}
const initForm = () => {
  props.searchColumns.forEach(({ prop }) => {
    form.value[prop] = ''
  })
}
/**
 * @name: getTableData
 * @msg: 获取列表数据
 * @param {*}
 * @return {*}list
 */
const getTableData = (loading = 'queryLoading') => {
  if (Object.keys(buttonLoading.value).length) {
    buttonLoading.value[loading] = true
  }
  // 表格loading
  tableDataloading.value = true
  props.tableUrl
    .list({
      pageSize: page.value.pageSize,
      currentPage: page.value.currentPage,
      params: {
        ...form.value
      }
    })
    .then((res) => {
      tableData.value = res.list
      page.value.total = res.total
    })
    .finally(() => {
      if (Object.keys(buttonLoading.value).length) {
        buttonLoading.value[loading] = false
      }
      tableDataloading.value = false
    })
}
// 子传父都定义在defineEmits中
const emits = defineEmits(['selectChange'])
// 多选事件
const handleSelectionChange = (arr) => {
  emits('selectChange', arr)
}
// 查询,默认loading
const queryData = () => {
  getTableData('queryLoading')
}
// 重置，默认loading
const reSetData = () => {
  initForm()
  getTableData('resetLoading')
}
const handleSizeChange = (val) => {
  getTableData()
}
const handleCurrentChange = (val) => {
  getTableData()
  page.value.currentPage = 1
}
// 暴露出去,第二种将子组件方法导出
defineExpose({
  getTableData,
  reSetData,
  queryData
})
</script>
<style lang='scss' scoped>
.pages-container {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 15px;
}
.tablePage-container {
  display: flex;
  flex-direction: column;
}
</style>
