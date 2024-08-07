import { ref, computed } from 'vue';

export function usePagination(data: any, itemsPerPage: number) {
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage));

    const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.value.slice(start, end);
    });

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value += 1;
        }
    };

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value -= 1;
        }
    };

    return { currentPage, totalPages, paginatedData, nextPage, prevPage };
}