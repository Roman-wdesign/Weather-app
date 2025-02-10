const CACHE_NAME = 'weather-cache' // Name of the cache storage
const CACHE_TTL = 60 * 60 * 1000 // TTL im milliseconds (now is 1 hour)

/**
 * Retrieves cached data for a given request.
 * If the cache exists but is outdated, it will be deleted.
 */

export async function getCachedData(request: Request): Promise<Response | undefined> {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    const dateHeader = cachedResponse.headers.get('sw-cache-date')
    if (dateHeader) {
      const cachedTime = new Date(dateHeader).getTime()
      const currentTime = new Date().getTime()

      // Check if cache is expired
      if (currentTime - cachedTime > CACHE_TTL) {
        console.log('Cache is old, will be delete', request.url)
        await cache.delete(request) // Delete old cache
        return undefined
      }
    }
  }

  return cachedResponse || undefined // Return cached response if valid
}

/**
 * Stores a response in the cache with a timestamp header.
 * Only caches successful (200 OK) responses.
 */
export async function setCachedData(request: Request, response: Response): Promise<void> {
  if (response.status === 200) {
    // Cache 200 status only
    const cache = await caches.open(CACHE_NAME)

    // Clone response and add timestamp header
    const clonedResponse = response.clone()
    const headers = new Headers(clonedResponse.headers)
    headers.set('sw-cache-date', new Date().toISOString())

    const newResponse = new Response(clonedResponse.body, {
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
      headers: headers
    })

    await cache.put(request, newResponse)
    console.log('Data has been cached:', request.url)
  } else {
    console.warn('Response with error is not cached:', response.status, request.url)
  }
}

/**
 * Deletes cached data for a specific request.
 */
export async function clearCachedData(request: Request): Promise<void> {
  const cache = await caches.open(CACHE_NAME)
  const result = await cache.delete(request)
  if (result) {
    console.log('Cache is delete for response:', request.url)
  } else {
    console.warn('Cache is no found for response:', request.url)
  }
}

/**
 * Clears all cached data.
 */
export async function clearAllCachedData(): Promise<void> {
  await caches.delete(CACHE_NAME)
  console.log('All cache is delete')
}
