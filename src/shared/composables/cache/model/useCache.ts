import {
  getCachedData,
  setCachedData
} from '@/shared/composables/cache/storage/model/useCacheStorage'

// Function to fetch data with caching mechanism
export async function fetchWithCache(url: string): Promise<any> {
  const request = new Request(url) // Create a request object
  const cachedResponse = await getCachedData(request) // Check for cached response

  if (cachedResponse) {
    return await cachedResponse.json() // Return cached data if available
  } else {
    const response = await fetch(request) // Fetch data from the network
    if (response && response.ok) {
      const cloneResponse = response.clone() // Clone the response for caching
      await setCachedData(request, cloneResponse) // Store the response in cache
      return await response.json() // Return fetched data
    } else {
      throw new Error(`Fetching ${url} cached failed`) // Handle failed request
    }
  }
}
