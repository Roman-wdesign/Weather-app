<script setup lang="ts">
import TheButton from '@/shared/components/buttons/TheButton.vue'

interface Props {
    currentPage: any,
    totalPages: any,
    nextPage: any,
    prevPage: any
}

const props = defineProps<Props>()
</script>

<template>
    <div v-if="props.totalPages > 1">
        <TheButton @click="props.prevPage" :disabled="props.currentPage === 1">Previous</TheButton>
        <span>Page {{ props.currentPage }} of {{ props.totalPages }}</span>
        <TheButton @click="props.nextPage" :disabled="props.currentPage === props.totalPages">Next</TheButton>
    </div>
</template>


<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>