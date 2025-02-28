<script setup lang="ts">
import type { CdkEntity } from '@/types/cdk'
import type { TableProps } from 'tdesign-vue-next'
import { useCdkEntityStorage } from '@/composables/useCdkEntityStorage'
import { useDateFormat } from '@vueuse/core'

const fakeKeys = `West of Dead, 4JGKG-BGFNL-GEWDV 4BBS9-QMPFN-I5JM6 1AB2C-D3FGH-456I7-JK8LM-P2222
Tooth and Tail:，4WXM7-3PJ82-5YD8E C3DTC-8FMBL-FQV0Q
SYSTEM SHOCK: ENHANCED EDITION 4QJXV-ACN8F-27BAJ 4G7FZ-QX6GJ-2W2KW
Dear Esther: Landmark Edition：4EEQB-7GM99-P2DA9 3ZN0R-DA2MG-VGR2Y
Call of duty:1AB2C-D3FGH-456I7,456I7-JK8LM-P5555`

const { cdkList, addCdkEntity } = useCdkEntityStorage()

const columns: TableProps['columns'] = [
  { colKey: 'name', title: '游戏名' },
  { colKey: 'cdk', title: 'cdk' },
  {
    colKey: 'createAt',
    title: '添加时间',
    cell: (_, { row }) => useDateFormat(row.createAt, 'YYYY-MM-DD HH:mm:ss').value,
  },
]

const data = ref<CdkEntity[]>([])

function extractGameAndCdk(line: string) {
  const cdkRegex = /((?!\D{12}|[^A-z]{12})([A-z0-9]{4,5}-?[A-z0-9]{4,5}-?[A-z0-9]{4,5}(-?[A-z0-9]{4,5}(-?[A-z0-9]{4,5})?)?))/g
  const cdkArr = line.match(cdkRegex) || []
  let name = line.replaceAll(cdkRegex, '').trim()
  // 名字末尾如果是分隔符则去除
  while (/[:：,，.。]$/.test(name)) {
    name = name.slice(0, -1)
  }
  return cdkArr.map(cdk => ({ name, cdk }))
}

function initCdkItem(name: string, cdk: string): CdkEntity {
  return {
    id: crypto.randomUUID(),
    name,
    cdk,
    status: 'isUnused',
    remark: '',
    createAt: Date.now(),
    updateAt: Date.now(),
  }
}

function handleFormat() {
  const lines = fakeKeys.split('\n')
  for (const line of lines) {
    if (line.trim()) {
      const gameCdkPairs = extractGameAndCdk(line)
      gameCdkPairs.forEach(({ name, cdk }) => {
        const cdkInstance = initCdkItem(name, cdk)
        addCdkEntity(cdkInstance)
      })
      data.value.push(...cdkList.value)
    }
  }
}

function handleReset() {
  cdkList.value = []
  data.value = []
}
</script>

<template>
  <div base>
    <div mb-4 flex items-center gap-10>
      <TButton @click="handleFormat">
        append
      </TButton>
      <TButton @click="handleReset">
        reset
      </TButton>
    </div>

    <TTable
      row-key="index"
      :data="data"
      :columns="columns"
      bordered
      hover
      table-layout="auto"
      cell-empty-content="-"
      resizable
      lazy-load
    />
  </div>
</template>
