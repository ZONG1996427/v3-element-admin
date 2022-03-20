<template>
  <div>
    <TablePage
      tableTitle="报表列表(可拖拽)"
      :costomColumns="costomColumns"
      :buttonList="buttonList"
      :tableUrl="tableUrl"
      :searchColumns="searchColumns"
      :operationList="operationList"
      isDrag
      ref="tablePageComponent"
      @selectChange="getSelectData"
    />
  </div>
</template>

<script setup>
import TablePage from '@/components/TablePage'
import { ref, computed, getCurrentInstance } from 'vue'
import { getStatementList } from '@/api/statement'
import { ElMessageBox } from 'element-plus'
import { messageTip } from '@/utils/message'
import { useRouter } from 'vue-router'

const tableUrl = {
  list: getStatementList
}
const setSelectList = ref([])
const operationList = computed(() => {
  return [
    {
      name: '编辑',
      click: (scope) => editClick(scope),
      hidden: (scope) => {
        return [2].includes(scope.row.status)
      }
    },
    {
      name: '删除',
      click: (scope) => deleteClick(scope)
    }
  ]
})
// 多选删除事件
const getSelectData = (data) => {
  console.log('子组件传过来的数据=>', data)
  setSelectList.value = data
}
// 子组件ref命名
const tablePageComponent = ref(null)
const router = useRouter()
const editClick = (scope) => {
  router.push('/user/info')
}
const currentInstance = getCurrentInstance()
// 单个删除
const deleteClick = (scope) => {
  ElMessageBox.confirm('确认删除这条数据吗?', '删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      messageTip('success', '删除成功')
      // 调用子组件方法刷新列表
      currentInstance.ctx.$refs.tablePageComponent.getTableData()
    })
    .catch(() => {
      messageTip('info', '删除失败')
    })
}
// 查询条件配置
const searchColumns = computed(() => {
  return [
    {
      label: '报表编号',
      type: 'input',
      prop: 'orderId'
    },
    {
      label: '金额大小',
      type: 'input',
      prop: 'title'
    },
    {
      label: '状态',
      type: 'select',
      prop: 'status',
      options: [
        {
          label: '有效',
          value: 1
        },
        {
          label: '无效',
          value: 2
        }
      ]
    }, {
      label: '是否审批',
      type: 'select',
      prop: 'isExamineApprove',
      options: [
        {
          label: '已审批',
          value: 1
        },
        {
          label: '未审批',
          value: 2
        }
      ]
    }
  ]
})

// 处理特殊表格显示，例如我们要点击某个字段，弹框，样式等等
const DomRender = ({ row }) => {
  return row.status === 1
    ? '<a style="color:red;">有效</a>'
    : '<a style="color:blue;">无效</a>'
}
const approvalStatusDomRender = ({ row }) => {
  return row.approvalStatus
    ? '<a style="color:red;">已审批</a>'
    : '<a style="color:blue;">未审批</a>'
}
// 列展示字段配置
const costomColumns = computed(() => {
  return [
    {
      label: 'id',
      prop: 'id'
    },
    {
      label: '详情',
      prop: 'desc',
      width: '220'
    },
    {
      label: '状态',
      prop: 'status',
      render: (scope) => {
        return DomRender(scope)
      },
      click: (scope) => {
        console.log(scope)
      }
    },
    {
      label: '文字',
      prop: 'text'
    },
    {
      label: '金额',
      prop: 'price'
    },
    {
      label: '报表编号',
      prop: 'orderId',
      width: '180'
    },
    {
      label: '标题',
      prop: 'title',
      width: '120'
    },
    {
      label: '地址',
      prop: 'address'
    },
    {
      label: '数字',
      prop: 'num'
    },
    {
      label: '订单编号1',
      prop: 'orderIds',
      width: '180'
    },
    {
      label: '审批状态',
      prop: 'approvalStatus',
      render: (scope) => {
        return approvalStatusDomRender(scope)
      },
      click: (scope) => {
        console.log(scope)
      }
    },
    {
      label: '文本',
      prop: 'texts',
      width: '120'
    },
    {
      label: '金额2',
      prop: 'prices'
    }
  ]
})

// 配置单独按钮
const buttonList = [
  {
    type: 'queryLoading',
    text: '查询',
    style: 'primary',
    click: () => {
      currentInstance.refs.tablePageComponent.queryData()
    }
  },
  {
    type: 'resetLoading',
    text: '重置',
    click: () => {
      currentInstance.refs.tablePageComponent.reSetData()
    }
  },
  {
    type: 'matchingLoading',
    text: '数据匹配',
    style: 'info',
    click: () => {
      currentInstance.refs.tablePageComponent.getTableData('matchingLoading')
    }
  }
]
</script>

<style lang="scss" scoped></style>
