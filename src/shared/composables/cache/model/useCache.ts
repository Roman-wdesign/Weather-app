import { getCachedData, setCachedData } from '@/shared/composables/cache/storage/model/useCacheStorage'

export async function fetchWithCache(url: string): Promise<any> {
    const request = new Request(url)
    const cachedResponse = await getCachedData(request)

    if (cachedResponse) {
        return await cachedResponse.json()
    } else {
        const response = await fetch(request)
        if (response && response.ok) {
            const cloneResponse = response.clone()
            await setCachedData(request, cloneResponse)
            return await response.json()
        } else {
            throw new Error(`Fetching ${url} cached failed`)
        }
    }
}