import { useColorMode, usePreferredDark } from '@vueuse/core'

// 切换黑夜模式 & 监听系统主题自动切换
export function useThemeMode() {
  const themeMode = useColorMode({ disableTransition: false })
  const isDarkMode = computed(() => themeMode.value === 'dark')
  const isPreferDark = usePreferredDark()

  const toggleThemeMode = () => {
    isDarkMode.value
      ? document.documentElement.removeAttribute('theme-mode')
      : document.documentElement.setAttribute('theme-mode', 'dark')
    themeMode.value = isDarkMode.value ? 'light' : 'dark'
  }

  watch(() => isPreferDark.value, () => {
    themeMode.value = isPreferDark.value ? 'dark' : 'light'
    isPreferDark.value
      ? document.documentElement.setAttribute('theme-mode', 'dark')
      : document.documentElement.removeAttribute('theme-mode')
  }, { immediate: true })

  return {
    themeMode,
    isDarkMode,
    isPreferDark,
    toggleThemeMode,
  }
}
