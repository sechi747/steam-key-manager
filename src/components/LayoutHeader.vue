<script setup lang="ts">
import DarkToggle from './DarkToggle.vue'

function toGithubPage() {
  window.open('https://github.com/sechi747/steam-key-manager')
}
</script>

<template>
  <div
    border="b-1 b-solid gray-200/50 important-dark:gray-200/20"
    fixed left-0 right-0 top-0 z-10 h-14 w-full fbc px-10 backdrop-blur-xl backdrop-saturate-150
  >
    <img
      left-8 top-6 h-6
      src="/vite.svg"
      alt="logo"
    >
    <div grid auto-flow-col gap-5>
      <i
        title="github"
        class="i-carbon-logo-github icon-btn hover:text-black dark:hover:text-white"
        @click="toGithubPage"
      />
      <DarkToggle />
    </div>
  </div>
</template>
