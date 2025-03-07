<script setup lang="tsx">
import type { CdkEntity, CdkStatus } from '@renderer/types/cdk'
import type { PrimaryTableCol } from 'tdesign-vue-next'
import { useCdkEntityStorage } from '@renderer/composables/useCdkEntityStorage'
import { useColorMode, useDateFormat } from '@vueuse/core'
import BatchAddCdkDialog from './components/BatchAddCdkDialog.vue'
import EditCdkDialog from './components/EditCdkDialog.vue'

// const fakeKeys = `West of Dead, 4JGKG-BGFNL-GEWDV 4BBS9-QMPFN-I5JM6 1AB2C-D3FGH-456I7-JK8LM-P2222
// Tooth and Tail:，4WXM7-3PJ82-5YD8E C3DTC-8FMBL-FQV0Q
// SYSTEM SHOCK: ENHANCED EDITION 4QJXV-ACN8F-27BAJ 4G7FZ-QX6GJ-2W2KW
// Dear Esther: Landmark Edition：4EEQB-7GM99-P2DA9 3ZN0R-DA2MG-VGR2Y
// Call of duty:1AB2C-D3FGH-456I7,456I7-JK8LM-P5555`

const { cdkList, deleteCdk, batchDeleteCdk } = useCdkEntityStorage()

const color = useColorMode({ disableTransition: false })

const statusMap = {
  isUsed: { text: '已使用', theme: 'danger' },
  isUnused: { text: '未使用', theme: 'success' },
  isPending: { text: '挂起', theme: 'default' },
}

const selectedRowKeys = ref<string[]>([])

const batchAddRef = ref<InstanceType<typeof BatchAddCdkDialog>>()
const editRef = ref<InstanceType<typeof EditCdkDialog>>()

function popupRenderer(row: CdkEntity) {
  const changeStatus = (status: CdkStatus) => {
    row.status = status
  }
  return (
    <div class="fccc gap-2 p-1">
      {Object.entries(statusMap).map(([key, { text, theme }]) => {
        return (
          <t-tag class="cursor-pointer" theme={theme} variant={color.value} onClick={() => changeStatus(key as CdkStatus)}>
            {text}
          </t-tag>
        )
      })}
    </div>
  )
}

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
        <t-popup content={() => popupRenderer(row)} placement="right" trigger="click" show-arrow destroy-on-close>
          <t-tag class="cursor-pointer" theme={statusMap[row.status].theme} variant={color.value}>
            {statusMap[row.status].text}
          </t-tag>
        </t-popup>
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
          <t-link theme="primary" hover="color" onClick={() => handleEdit(row.id)}>
            编辑
          </t-link>
          <t-link theme="danger" hover="color" onClick={() => handleDelete(row.id)}>
            删除
          </t-link>
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
        批量新增
      </t-button>
      <t-button theme="danger" :disabled="selectedRowKeys.length < 1" @click="handleBatchDelete">
        批量删除
      </t-button>
    </div>

    <t-table
      v-model:selected-row-keys="selectedRowKeys"
      row-key="id"
      :data="cdkList"
      :border="false"
      cell-empty-content="-"
      lazy-load
      :columns="columns as unknown as PrimaryTableCol[]"
    />

    <BatchAddCdkDialog ref="batchAddRef" />
    <EditCdkDialog ref="editRef" />
  </div>
</template>
