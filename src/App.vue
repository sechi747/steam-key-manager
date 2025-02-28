<script setup lang="ts">
import LayoutHeader from '@/components/LayoutHeader.vue'
</script>

<template>
  <div h-screen w-screen bg>
    <LayoutHeader />
    <main class="px-10 py-20 bg">
      <RouterView />
    </main>
  </div>
</template>
