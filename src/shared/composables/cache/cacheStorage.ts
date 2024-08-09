const CACHE_NAME = 'weather-cache'

export async function getCachedData(request: Request): Promise <Response | undefined> {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)
    return cachedResponse || undefined
}


export async function setCachedData(request: Request, response: Response): Promise <void>{
const cache = await caches.open(CACHE_NAME)
await cache.put(request, response)
}


export async function clearCachedData(request: Request): Promise<void> {
    const cache = await caches.open(CACHE_NAME)
    await cache.delete(request)
}


export async function clearAllCachedData(): Promise<void> {
    await caches.delete(CACHE_NAME)
}