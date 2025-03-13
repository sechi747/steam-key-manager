<script setup lang="ts">
import { useThemeMode } from '@renderer/composables/useThemeMode'

const { themeMode, isDarkMode, toggleThemeMode } = useThemeMode()

const buttonTitle = ref('')
const switchRef = ref<HTMLElement>()

async function toggleColor() {
  await handleViewTransition()
  toggleThemeMode()
}

function handleViewTransition() {
  return new Promise<boolean>((resolve) => {
    const isAppearanceTransition
      // @ts-expect-error expect
      = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isAppearanceTransition) {
      resolve(true)
      return
    }

    const switchElement = switchRef.value
    const rect = switchElement!.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    const transition = document.startViewTransition(async () => {
      resolve(true)
      await nextTick()
    })
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDarkMode.value ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-in',
          pseudoElement: isDarkMode.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
  })
}

watch(
  () => themeMode.value,
  () => nextTick(() => buttonTitle.value = themeMode.value === 'dark' ? '切换至日间模式' : '切换至夜间模式'),
  { immediate: true },
)
</script>

<template>
  <i
    ref="switchRef"
    :title="buttonTitle"
    class="i-carbon-sun icon-btn hover:text-amber"
    dark="i-carbon-moon hover:text-white "
    @click="toggleColor"
  />
</template>
