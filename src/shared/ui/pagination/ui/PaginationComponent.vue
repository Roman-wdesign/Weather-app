<script setup lang="ts">
import { TheButton } from '@/shared/ui/buttons/main-btn/ui'

interface Props {
  currentPage: number
  totalPages: number
  nextPage: () => void
  prevPage: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex justify-center gap-2 items-center" v-if="props.totalPages > 1">
    <TheButton
      class="w-auto text-white font-bold py-2 px-4 rounded"
      @click="props.prevPage"
      :disabled="props.currentPage === 1"
      >Previous</TheButton
    >
    <span>Page {{ props.currentPage }} of {{ props.totalPages }}</span>

    <TheButton
      class="w-auto text-white font-bold py-2 px-4 rounded"
      @click="props.nextPage"
      :disabled="props.currentPage === props.totalPages"
      >Next</TheButton
    >
  </div>
</template>
