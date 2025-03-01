<script setup lang="tsx">
import type { CdkEntity } from '@/types/cdk'
import type { PrimaryTableCol } from 'tdesign-vue-next'
import { useCdkEntityStorage } from '@/composables/useCdkEntityStorage'
import { useDateFormat } from '@vueuse/core'
import BatchAddCdkDialog from './components/BatchAddCdkDialog.vue'
import EditCdkDialog from './components/EditCdkDialog.vue'

// const fakeKeys = `West of Dead, 4JGKG-BGFNL-GEWDV 4BBS9-QMPFN-I5JM6 1AB2C-D3FGH-456I7-JK8LM-P2222
// Tooth and Tail:，4WXM7-3PJ82-5YD8E C3DTC-8FMBL-FQV0Q
// SYSTEM SHOCK: ENHANCED EDITION 4QJXV-ACN8F-27BAJ 4G7FZ-QX6GJ-2W2KW
// Dear Esther: Landmark Edition：4EEQB-7GM99-P2DA9 3ZN0R-DA2MG-VGR2Y
// Call of duty:1AB2C-D3FGH-456I7,456I7-JK8LM-P5555`

const { cdkList, deleteCdk, batchDeleteCdk } = useCdkEntityStorage()

const statusMap = {
  isUsed: { text: '已使用', theme: 'danger' },
  isUnused: { text: '未使用', theme: 'success' },
  isPending: { text: '挂起', theme: ' default' },
}

const selectedRowKeys = ref<string[]>([])

const batchAddRef = ref<InstanceType<typeof BatchAddCdkDialog>>()
const editRef = ref<InstanceType<typeof EditCdkDialog>>()

const columns: PrimaryTableCol<CdkEntity>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
  },
  { colKey: 'name', title: '游戏名' },
  { colKey: 'cdk', title: 'cdk' },
  {
    colKey: 'status',
    title: '状态',
    align: 'center',
    width: 110,
    cell: (_, { row }) => {
      return (
        <t-tag theme={statusMap[row.status].theme}>
          {statusMap[row.status].text}
        </t-tag>
      )
    },
  },
  {
    colKey: 'createAt',
    title: '添加时间',
    align: 'center',
    width: 220,
    cell: (_, { row }) => useDateFormat(row.createAt, 'YYYY-MM-DD HH:mm:ss').value,
  },
  {
    colKey: 'operation',
    title: '操作',
    align: 'center',
    width: 150,
    cell: (_, { row }) => {
      return (
        <div class="fcc gap-2">
          <t-button theme="primary" size="small" onClick={() => handleEdit(row.id)}>
            编辑
          </t-button>
          <t-button theme="danger" size="small" onClick={() => handleDelete(row.id)}>
            删除
          </t-button>
        </div>
      )
    },
  },
]

function handleDelete(id: string) {
  deleteCdk(id)
}

function handleBatchDelete() {
  batchDeleteCdk(selectedRowKeys.value)
}

function handleEdit(id: string) {
  editRef.value?.open(id)
}

function handleFormat() {
  batchAddRef.value?.open()
}
</script>

<template>
  <div base>
    <div mb-4 flex items-center gap-4>
      <t-button @click="handleFormat">
        batch add
      </t-button>
      <t-button theme="danger" @click="handleBatchDelete">
        batch delete
      </t-button>
    </div>

    <t-table
      v-model:selected-row-keys="selectedRowKeys"
      row-key="id"
      :data="cdkList"
      :border="false"
      hover
      cell-empty-content="-"
      lazy-load
      :columns="columns as unknown as PrimaryTableCol[]"
    />

    <BatchAddCdkDialog ref="batchAddRef" />
    <EditCdkDialog ref="editRef" />
  </div>
</template>
