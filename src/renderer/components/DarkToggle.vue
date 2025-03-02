<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const color = useColorMode({ disableTransition: false })

const buttonTitle = ref('')

function toggleColor() {
  color.value === 'dark'
    ? document.documentElement.removeAttribute('theme-mode')
    : document.documentElement.setAttribute('theme-mode', 'dark')
  color.value = color.value === 'dark' ? 'light' : 'dark'
}

watch(
  () => color.value,
  () => nextTick(() => buttonTitle.value = color.value === 'dark' ? '切换至日间模式' : '切换至夜间模式'),
  { immediate: true },
)
</script>

<template>
  <i
    :title="buttonTitle"
    class="i-carbon-sun icon-btn hover:text-amber"
    dark="i-carbon-moon hover:text-white "
    @click="toggleColor"
  />
</template>
