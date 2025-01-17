import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchWithCache } from '@/shared/composables/cache/model'

describe('fetchWithCache', () => {
  const mockUrl = 'https://api.example.com/data'
  const mockRequest = new Request(mockUrl)

  beforeEach(() => {
    const mockCache = {
      match: vi.fn(),
      put: vi.fn()
    }
    global.caches = {
      open: vi.fn().mockResolvedValue(mockCache)
    } as unknown as CacheStorage

    global.fetch = vi.fn()
  })

  it('should fetch data if no cached data exists and cache it', async () => {
    const mockFetchResponse = new Response(JSON.stringify({ data: 'fetchedData' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
    global.fetch = vi.fn().mockResolvedValue(mockFetchResponse)

    const result = await fetchWithCache(mockUrl)

    expect(global.fetch).toHaveBeenCalledWith(mockRequest)
    expect(result).toEqual({ data: 'fetchedData' })
    expect(global.caches.open).toHaveBeenCalledWith('weather-cache')
  })

  it('should throw an error if fetching fails', async () => {
    const mockFailedResponse = new Response(null, {
      status: 500,
      statusText: 'Internal Server Error'
    })
    global.fetch = vi.fn().mockResolvedValue(mockFailedResponse)

    await expect(fetchWithCache(mockUrl)).rejects.toThrow(`Fetching ${mockUrl} cached failed`)
  })
})
