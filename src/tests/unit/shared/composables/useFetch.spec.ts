import { useFetch } from '@/shared/composables/useFetch'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'


describe('useFetch', () => {
    let globalFetch: typeof fetch

    beforeEach(() => {
        globalFetch = global.fetch
        vi.useFakeTimers()
    })

    afterEach(() => {
        global.fetch = globalFetch
        vi.useRealTimers()
        vi.clearAllMocks()
    })

    it('should have default values', () => {
        const { data, error, loading } = useFetch()

        expect(data.value).toBeNull()
        expect(error.value).toBeNull()
        expect(loading.value).toBe(false)
    })

    it('should set loading to true when fetching data', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'Success' }),
        })

        const { loading, fetchData } = useFetch()
        fetchData('https://api.sampleapis.com/coffee/hot')

        expect(loading.value).toBe(true)

        await vi.runAllTimersAsync()

        expect(loading.value).toBe(false)
    })

    it('should correctly handle successful fetch', async () => {
        const mockResponseData = { message: 'success' }
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponseData,
        })

        const { data, error, loading, fetchData } = useFetch()
        fetchData('https://api.sampleapis.com/coffee/hot')

        await vi.runAllTimersAsync()

        expect(data.value).toEqual(mockResponseData)
        expect(error.value).toBeNull()
        expect(loading.value).toBe(false)
    })

    it('should set error when response is not ok', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: 'Not Found',
        })

        const { data, error, loading, fetchData } = useFetch()
        fetchData('https://api.sampleapis.com/coffee/hot')

        await vi.runAllTimersAsync()

        expect(data.value).toBeNull()
        expect(error.value).toBe('Failed to fetch data')
        expect(loading.value).toBe(false)
    })

    it('should handle network errors correctly', async () => {
        global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network Error'))

        const { data, error, loading, fetchData } = useFetch()
        fetchData('https://api.sampleapis.com/coffee/hot')

        await vi.runAllTimersAsync()

        expect(data.value).toBeNull()
        expect(error.value).toBe('Network Error')
        expect(loading.value).toBe(false)
    })
})
