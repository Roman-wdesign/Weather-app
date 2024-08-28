import { ref } from 'vue'
import type { Ref } from 'vue'

export const useFetch = () => {
  const data: Ref<string | null> = ref(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  function fetchData(url: string) {
    loading.value = true
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then(jsonData => {
        data.value = jsonData
      })
      .catch(err => {
        if (err instanceof Error) {
          error.value = err.message
        } else {
          error.value = 'An unknown error occurred'
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  return { data, error, loading, fetchData }
}
