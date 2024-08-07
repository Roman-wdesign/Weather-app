<script setup lang="ts">

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
        <button @click="props.prevPage" :disabled="props.currentPage === 1">Previous</button>
        <span>Page {{ props.currentPage }} of {{ props.totalPages }}</span>
        <button @click="props.nextPage" :disabled="props.currentPage === props.totalPages">Next</button>
    </div>
</template>


<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    margin: 0 5px;
}
</style>