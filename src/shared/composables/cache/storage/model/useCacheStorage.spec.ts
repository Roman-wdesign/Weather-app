import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getCachedData,
  setCachedData,
  clearCachedData,
  clearAllCachedData
} from '@/shared/composables/cache/storage/model/useCacheStorage'

const CACHE_NAME = 'weather-cache'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

let cacheMock: any
let cacheStorageMock: any

beforeEach(() => {
  cacheMock = {
    match: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }

  cacheStorageMock = {
    open: vi.fn(() => Promise.resolve(cacheMock)),
    delete: vi.fn()
  }

  global.caches = cacheStorageMock
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('cacheService', () => {
  it('should return cached data if it is not expired', async () => {
    const mockRequest = new Request('https://example.com')
    const mockResponse = new Response('Cached content', {
      headers: { 'sw-cache-date': new Date().toISOString() }
    })

    cacheMock.match.mockResolvedValueOnce(mockResponse)

    const cachedData = await getCachedData(mockRequest)

    expect(cachedData).toBe(mockResponse)
    expect(cacheStorageMock.open).toHaveBeenCalledWith(CACHE_NAME)
    expect(cacheMock.match).toHaveBeenCalledWith(mockRequest)
  })

  it('should delete and return undefined if cache is expired', async () => {
    const mockRequest = new Request('https://example.com')
    const expiredDate = new Date(Date.now() - CACHE_TTL - 1000).toISOString()
    const mockResponse = new Response('Cached content', {
      headers: { 'sw-cache-date': expiredDate }
    })

    cacheMock.match.mockResolvedValueOnce(mockResponse)

    const cachedData = await getCachedData(mockRequest)

    expect(cachedData).toBeUndefined()
    expect(cacheStorageMock.open).toHaveBeenCalledWith(CACHE_NAME)
    expect(cacheMock.match).toHaveBeenCalledWith(mockRequest)
    expect(cacheMock.delete).toHaveBeenCalledWith(mockRequest)
  })

  it('should cache response with a 200 status code', async () => {
    const mockRequest = new Request('https://example.com')
    const mockResponse = new Response('Fresh content', { status: 200 })

    await setCachedData(mockRequest, mockResponse)

    expect(cacheStorageMock.open).toHaveBeenCalledWith(CACHE_NAME)
    expect(cacheMock.put).toHaveBeenCalled()

    const putArgs = cacheMock.put.mock.calls[0]
    const requestArg = putArgs[0]
    const responseArg = putArgs[1]

    expect(requestArg).toBe(mockRequest)
    expect(responseArg.headers.get('sw-cache-date')).toBeTruthy()
  })

  it('should not cache response with a non-200 status code', async () => {
    const mockRequest = new Request('https://example.com')
    const mockResponse = new Response('Error content', { status: 500 })

    await setCachedData(mockRequest, mockResponse)

    expect(cacheStorageMock.open).not.toHaveBeenCalled()
    expect(cacheMock.put).not.toHaveBeenCalled()
  })

  it('should clear specific cached data', async () => {
    const mockRequest = new Request('https://example.com')

    cacheMock.delete.mockResolvedValueOnce(true)

    await clearCachedData(mockRequest)

    expect(cacheStorageMock.open).toHaveBeenCalledWith(CACHE_NAME)
    expect(cacheMock.delete).toHaveBeenCalledWith(mockRequest)
  })

  it('should log warning if cache to clear is not found', async () => {
    const mockRequest = new Request('https://example.com')

    cacheMock.delete.mockResolvedValueOnce(false)

    await clearCachedData(mockRequest)

    expect(cacheStorageMock.open).toHaveBeenCalledWith(CACHE_NAME)
    expect(cacheMock.delete).toHaveBeenCalledWith(mockRequest)
  })

  it('should clear all cached data', async () => {
    await clearAllCachedData()

    expect(cacheStorageMock.delete).toHaveBeenCalledWith(CACHE_NAME)
  })
})
