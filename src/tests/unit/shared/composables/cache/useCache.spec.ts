import { describe, it, expect, vi } from 'vitest'
import { fetchWithCache } from '@/shared/composables/cache/useCache'
import { getCachedData, setCachedData } from '@/shared/composables/cache/useCacheStorage'

// Мокаем getCachedData и setCachedData
vi.mock('@/shared/composables/cache/useCacheStorage', () => ({
  getCachedData: vi.fn(),
  setCachedData: vi.fn(),
}))

describe('fetchWithCache', () => {
  const mockUrl = 'https://api.example.com/data'
  const mockRequest = new Request(mockUrl)

  it('should fetch data if no cached data exists and cache it', async () => {

    vi.fn().mockResolvedValue(undefined)
    const mockFetchResponse = new Response(JSON.stringify({ data: 'fetchedData' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
    global.fetch = vi.fn().mockResolvedValue(mockFetchResponse)


    const result = await fetchWithCache(mockUrl)


    expect(global.fetch).toHaveBeenCalledWith(mockRequest)
    expect(result).toEqual({ data: 'fetchedData' })
  })

  it('should throw an error if fetching fails', async () => {

    vi.fn().mockResolvedValue(undefined)
    const mockFailedResponse = new Response(null, { status: 500, statusText: 'Internal Server Error' })
    global.fetch = vi.fn().mockResolvedValue(mockFailedResponse)


    await expect(fetchWithCache(mockUrl)).rejects.toThrow(`Fetching ${mockUrl} cached failed`)


    expect(setCachedData).toHaveBeenCalled()
  })
})
