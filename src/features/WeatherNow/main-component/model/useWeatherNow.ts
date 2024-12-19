import { ref, computed, onMounted, watch } from 'vue'

import { urlBase, imgUrl, token, reverseGeo } from '@/shared/config'

import { fetchWithCache } from '@/shared/composables/cache/model'

import {
  generateGeocodingUrl,
  generatePolutionUrl,
  generateWeatherUrl
} from '@/features/WeatherNow/main-component/api'
import { useSavedCities } from '@/shared/composables/localStorage/saved-cities/model'

export const useWeatherNow = () => {
  const theQuery = ref<string>('')
  const theWeather = ref<Record<string, any>>({})
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const suggestions = ref<string[]>([])
  const maxResults = 5
  const isSaveDisabled = computed(() => savedCities.value.length >= 3)

  const setResults = (city: string, results: string) => {
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
      const response = await fetch(`${urlBase}find?q=${query}&appid=${token}`)
      const data = await response.json()
      suggestions.value = (
        data.list.map((city: any) => `${city.name}, ${city.sys.country}`) || []
      ).slice(0, maxResults)
    } catch (err) {
      console.error('Error when receiving hints:', err) 
      suggestions.value = []
    }
  }

  const fetchAirPollutionData = async (city: string) => {
    loading.value = true
    error.value = null
    try {
      // Fetch latitude and longitude from Geocoding API
      const geoUrl = generateGeocodingUrl(reverseGeo, city, token)
      const geoResponse = await fetchWithCache(geoUrl)
      const geoData = geoResponse[0]

      if (!geoData?.lat || !geoData?.lon) {
        throw new Error('Unable to fetch geolocation data')
      }

      console.log('Geolocation response:', geoData)

      // Fetch air pollution data using latitude and longitude
      const pollutionUrl = generatePolutionUrl(urlBase, geoData.lat, geoData.lon, token)
      const pollutionData = await fetchWithCache(pollutionUrl)

      console.log('Air pollution data:', pollutionData)

      // Merge pollution data into theWeather
      if (theWeather.value[city]) {
        theWeather.value[city] = {
          ...theWeather.value[city],
          ...pollutionData
        }
      } else {
        theWeather.value[city] = { pollution: pollutionData }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'An unknown error occurred while fetching air pollution data'
      }
    } finally {
      loading.value = false
    }
  }

  watch(theQuery, (newQuery) => {
    fetchCitySuggestions(newQuery)
  })

  const { savedCities, saveCurrentCity, removeCityFromStorage, loadSavedCities } = useSavedCities(
    theWeather,
    fetchWeather,
    fetchAirPollutionData
  )

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
    async fetchWeatherForQuery() {
      theQuery.value
        ? await fetchWeather(theQuery.value)
        : console.log('fetchWeatherForQuery error')
    },
    async fetchAirPollutionForQuery() {
      theQuery.value
        ? await fetchAirPollutionData(theQuery.value)
        : console.log('fetchAirPollutionForQuery error')
    },
    isSaveDisabled,
    saveCurrentCity,
    removeCityFromStorage
  }
}
