const CACHE_NAME = 'weather-cache'
const CACHE_TTL = 60 * 60 * 1000 // TTL im milliseconds (now is 1 hour)

export async function getCachedData(request: Request): Promise<Response | undefined> {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    const dateHeader = cachedResponse.headers.get('sw-cache-date')
    if (dateHeader) {
      const cachedTime = new Date(dateHeader).getTime()
      const currentTime = new Date().getTime()

      if (currentTime - cachedTime > CACHE_TTL) {
        console.log('Cache is old, will be delete', request.url)
        await cache.delete(request) // Delete old cache
        return undefined
      }
    }
  }

  return cachedResponse || undefined
}

export async function setCachedData(request: Request, response: Response): Promise<void> {
  if (response.status === 200) {
    // Cache 200 status only
    const cache = await caches.open(CACHE_NAME)

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

export async function clearCachedData(request: Request): Promise<void> {
  const cache = await caches.open(CACHE_NAME)
  const result = await cache.delete(request)
  if (result) {
    console.log('Cache is delete for response:', request.url)
  } else {
    console.warn('Cache is no found for response:', request.url)
  }
}

export async function clearAllCachedData(): Promise<void> {
  await caches.delete(CACHE_NAME)
  console.log('All cache is delete')
}
