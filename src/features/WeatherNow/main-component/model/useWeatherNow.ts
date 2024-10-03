
import { ref, computed, onMounted } from 'vue'

import { urlBase, imgUrl, token } from '@/shared/config'

import { fetchWithCache } from '@/shared/composables/cache/model'

import { generateWeatherUrl } from '@/features/WeatherNow/main-component/api'
import { useSavedCities } from '@/shared/composables/localStorage/saved-cities/model'



export function useWeatherNow() {
  const theQuery = ref<string>('')
  const theWeather = ref<Record<string, any>>({})
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

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

  const fetchWeatherForQuery = computed(async () => (theQuery.value ? await fetchWeather(theQuery.value) : undefined))

  const { savedCities, saveCurrentCity, removeCityFromStorage, loadSavedCities } = useSavedCities(theWeather, fetchWeather)

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
    fetchWeatherForQuery,
    isSaveDisabled,
    saveCurrentCity,
    removeCityFromStorage,
  }
}
