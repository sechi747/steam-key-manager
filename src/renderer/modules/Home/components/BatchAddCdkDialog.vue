<script setup lang="ts">
import { useCdkEntityStorage } from '@renderer/composables/useCdkEntityStorage'
import { processInputLines } from '@renderer/utils/extractUtils'

const visible = ref(false)
const inputLines = ref('')

async function handleAddCdk() {
  const lines = inputLines.value.split('\n')
  const cdkInstances = processInputLines(lines)
  const { batchAddCdk } = useCdkEntityStorage()
  await batchAddCdk(cdkInstances)
}

async function onConfirm() {
  await handleAddCdk()
  close()
}

function open() {
  visible.value = true
}

function close() {
  inputLines.value = ''
  visible.value = false
}

defineExpose({ open })
</script>

<template>
  <t-dialog
    v-model:visible="visible"
    header="批量添加 cdk"
    width="650px"
    :close-on-overlay-click="false"
    :on-confirm="onConfirm"
    @close="close"
  >
    <div class="">
      <t-textarea v-model="inputLines" placeholder="每个游戏名及 cdk 需要独占一行" :autosize="{ minRows: 10 }" />
    </div>
  </t-dialog>
</template>
