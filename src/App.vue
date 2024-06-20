<script setup lang="ts">
import TheNavbar from '@/shared/components/TheNavbar.vue'
</script>

<template>
  <div class="w-full h-screen">
    <div>
      <TheNavbar />
    </div>
    <RouterView />
  </div>
</template>
