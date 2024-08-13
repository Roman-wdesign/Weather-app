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
                await cache.delete(request) // Delete old cache
                return undefined
            }
        }
    }

    return cachedResponse || undefined
}

export async function setCachedData(request: Request, response: Response): Promise<void> {
    const cache = await caches.open(CACHE_NAME)

    const clonedResponse = response.clone()
    const headers = new Headers(clonedResponse.headers)
    headers.set('sw-cache-date', new Date().toISOString())

    const newResponse = new Response(clonedResponse.body, {
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
        headers: headers,
    })

    await cache.put(request, newResponse)
}

export async function clearCachedData(request: Request): Promise<void> {
    const cache = await caches.open(CACHE_NAME)
    await cache.delete(request)
}

export async function clearAllCachedData(): Promise<void> {
    await caches.delete(CACHE_NAME)
}