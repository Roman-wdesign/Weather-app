import { ref } from 'vue'
import { usePagination } from '@/shared/ui/pagination/model/usePagination'
import { describe, it, expect } from 'vitest'

describe('usePagination', () => {
  it('should correctly compute total pages', () => {
    const data = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const itemsPerPage = 5

    const { totalPages } = usePagination(data, itemsPerPage)
    expect(totalPages.value).toBe(2)
  })

  it('should correctly paginate data', () => {
    const data = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const itemsPerPage = 5

    const { paginatedData, currentPage } = usePagination(data, itemsPerPage)
    expect(paginatedData.value).toEqual([1, 2, 3, 4, 5])

    currentPage.value = 2
    expect(paginatedData.value).toEqual([6, 7, 8, 9])
  })

  it('should go to the next page', () => {
    const data = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const itemsPerPage = 5

    const { currentPage, nextPage } = usePagination(data, itemsPerPage)

    nextPage()
    expect(currentPage.value).toBe(2)
  })

  it('should go to the prev page', () => {
    const data = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const itemsPerPage = 5

    const { currentPage, prevPage } = usePagination(data, itemsPerPage)

    currentPage.value = 2
    prevPage()
    expect(currentPage.value).toBe(1)
  })
})
