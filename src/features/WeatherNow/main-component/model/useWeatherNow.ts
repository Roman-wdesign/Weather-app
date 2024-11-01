import { ref, computed, onMounted, watch } from 'vue'

import { urlBase, imgUrl, token } from '@/shared/config'

import { fetchWithCache } from '@/shared/composables/cache/model'

import { generateWeatherUrl } from '@/features/WeatherNow/main-component/api'
import { useSavedCities } from '@/shared/composables/localStorage/saved-cities/model'

export function useWeatherNow() {
  const theQuery = ref<string>('')
  const theWeather = ref<Record<string, any>>({})
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const suggestions = ref<string[]>([])
  const maxResults = 5

  const setResults = (city: string, results: any) => {
    theWeather.value[city] = results
  }

  const fetchWeather = async (city: string) => {
    const apiUrl = generateWeatherUrl(urlBase, city, token)
    loading.value = true
    error.value = null
    try {
      const data = await fetchWithCache(apiUrl)
      setResults(city, data)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'An unknown error occurred'
      }
    } finally {
      loading.value = false
    }
  }

  const fetchCitySuggestions = async (query: string) => {
    if (query.length < 3) {
      suggestions.value = []
      return
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${token}`
      )
      const data = await response.json()
      suggestions.value = (
        data.list.map((city: any) => `${city.name}, ${city.sys.country}`) || []
      ).slice(0, maxResults)
    } catch (err) {
      console.error('Ошибка при получении подсказок:', err)
      suggestions.value = []
    }
  }

  watch(theQuery, (newQuery) => {
    fetchCitySuggestions(newQuery)
  })

  const { savedCities, saveCurrentCity, removeCityFromStorage, loadSavedCities } = useSavedCities(
    theWeather,
    fetchWeather
  )

  const isSaveDisabled = computed(() => savedCities.value.length >= 3)

  onMounted(() => {
    loadSavedCities()
  })

  return {
    savedCities,
    theQuery,
    theWeather,
    error,
    loading,
    imgUrl,
    suggestions,
    fetchWeatherForQuery: computed(async () =>
      theQuery.value ? await fetchWeather(theQuery.value) : undefined
    ),
    isSaveDisabled,
    saveCurrentCity,
    removeCityFromStorage
  }
}
