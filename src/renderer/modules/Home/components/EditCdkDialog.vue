<script setup lang="ts">
import type { FormProps } from 'tdesign-vue-next'
import { useCdkEntityStorage } from '@renderer/composables/useCdkEntityStorage'
import { cloneDeep } from 'lodash-es'

const { findCdk, editCdk } = useCdkEntityStorage()

const statusList = [
  { label: '未使用', value: 'isUnused' },
  { label: '已使用', value: 'isUsed' },
  { label: '挂起', value: 'isPending' },
]
const visible = ref(false)
const formData: FormProps['data'] = ref({
  name: '',
  cdk: '',
  status: '',
})

function onConfirm() {
  editCdk({ ...formData!.value, updateAt: Date.now() })
  close()
}

function open(id: string) {
  formData!.value = cloneDeep(findCdk(id))
  visible.value = true
}

function close() {
  visible.value = false
}

defineExpose({ open })
</script>

<template>
  <t-dialog
    v-model:visible="visible"
    header="编辑"
    width="650px"
    :close-on-overlay-click="false"
    :on-confirm="onConfirm"
    @close="close"
  >
    <div class="">
      <t-form
        :data="formData"
        label-width="calc(2em + 24px)"
      >
        <t-form-item label="游戏名">
          <t-input v-model="formData.name" />
        </t-form-item>

        <t-form-item label="cdk">
          <t-input v-model="formData.cdk" />
        </t-form-item>

        <t-form-item label="状态">
          <t-select v-model="formData.status">
            <t-option v-for="item in statusList" :key="item.value" :value="item.value" :label="item.label" />
          </t-select>
        </t-form-item>
      </t-form>
    </div>
  </t-dialog>
</template>
