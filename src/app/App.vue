<script setup lang="ts">
import { TheNavbar } from '@/widgets/navbar'
</script>

<template>
  <TheNavbar />
  <div class="container mx-auto px-2 md:px-4">
    <RouterView />
  </div>
</template>
