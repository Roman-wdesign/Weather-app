import { useFetch } from '@/shared/composables/useFetch'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'



describe('useFetch', () => {
 
    const mockFetch = vi.fn()

    beforeEach(()=>{
        global.fetch = mockFetch
    })

    afterEach(()=>{
        vi.restoreAllMocks()
    })

it ('shoud be default', () => {
    const {data, error, loading} = useFetch()

    expect(data.value).toBeNull()
    expect(error.value).toBeNull()
    expect(loading.value).toBe(false)
})

it ('should be loading is true when loading is true', async () => {
    mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({message:'Success'})
    })

    const {loading, fetchData} = useFetch()
    const url = 'https://api.sampleapis.com/coffee/hot'

    const fetchPromise = fetchData(url)
    expect(loading.value).toBe(true)

    await fetchPromise
    expect(loading.value).toBe(false)
})

it('should correctly work with success', async () => {
const mockResponseData = {message:'success'}
mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponseData
})
 const { data, error, fetchData } = useFetch()
 const url = 'https://api.sampleapis.com/coffee/hot'

await fetchData(url)

expect(data.value).toEqual(mockResponseData)
expect(error.value).toBeNull()

})

it('should be error when response', async () => {
mockFetch.mockResolvedValueOnce({
    ok: false,
    status: 400,
    statusText: 'Not Found'
})
 const { data, error, fetchData } = useFetch()
 const url = 'https://api.sampleapis.com/coffee/hot'

await fetchData(url)

expect(data.value).toBeNull()
expect(error.value).toBe('Failed to fetch data')

})

it('should work with other network errors', async () => {
mockFetch.mockResolvedValueOnce(new Error('Network Error'))
const { data, error, fetchData } = useFetch()
const url = 'https://api.sampleapis.com/coffee/hot'

await fetchData(url)

expect(data.value).toBeNull()
expect(error.value).toBe('Failed to fetch data')
})
})