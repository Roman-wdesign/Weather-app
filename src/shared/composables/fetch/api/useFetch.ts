import { ref } from 'vue'
import type { Ref } from 'vue'

// Custom composable for fetching data
export const useFetch = () => {
  const data: Ref<string | null> = ref(null) // Stores fetched data
  const error = ref<string | null>(null) // Stores error message if exists
  const loading = ref<boolean>(false) // Indicates loading state

  /**
   * Fetches data from the given URL.
   * Updates state variables accordingly.
   */
  async function fetchData(url: string) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch data') // Handle HTTP errors
      }

      const jsonData = await response.json()
      data.value = jsonData // Store fetched data
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message // Store error message
      } else {
        error.value = 'An unknown error occurred'
      }
    } finally {
      loading.value = false // Set loading to false after request completes
    }
  }

  return { data, error, loading, fetchData } // Expose state and function
}
