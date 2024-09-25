import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { PaginationComponent } from '@/shared/ui/pagination'

describe('Pagination Component', () => {
    const nextPage = vi.fn()
    const prevPage = vi.fn()

    const createWrapper = (currentPage: number, totalPages: number) => {
        return mount(PaginationComponent, {
            props: {
                currentPage,
                totalPages,
                nextPage,
                prevPage,
            },
        })
    }

    it('renders correctly when totalPages is greater than 1', () => {
        const wrapper = createWrapper(1, 5)
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.text()).toContain('Page 1 of 5')
    })

    it('disables Previous button on the first page', () => {
        const wrapper = createWrapper(1, 5)
        const prevButton = wrapper.find('button:disabled')
        expect(prevButton.exists()).toBe(true)
        expect(prevButton.text()).toBe('Previous')
    })

    it('disables Next button on the last page', () => {
        const wrapper = createWrapper(5, 5)
        const nextButton = wrapper.find('button:disabled')
        expect(nextButton.exists()).toBe(true)
        expect(nextButton.text()).toBe('Next')
    })

    it('calls nextPage when Next button is clicked', async () => {
        const wrapper = createWrapper(2, 5)
        const nextButton = wrapper.find('button:last-of-type')
        await nextButton.trigger('click')
        expect(nextPage).toHaveBeenCalled()
    })

    it('calls prevPage when Previous button is clicked', async () => {
        const wrapper = createWrapper(2, 5)
        const prevButton = wrapper.find('button:first-of-type')
        await prevButton.trigger('click')
        expect(prevPage).toHaveBeenCalled()
    })
})
