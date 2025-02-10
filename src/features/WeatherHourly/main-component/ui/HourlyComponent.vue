<script setup lang="ts">
import { watch, onMounted, ref, computed, nextTick } from 'vue'
import { useGeolocation } from '@/shared/composables/geolocation/model'
import { useFetch } from '@/shared/composables/fetch/api'
import { generateHourlyWeather } from '@/features/WeatherHourly/main-component/api'
import { urlBase, token } from '@/shared/config'
import { usePagination } from '@/shared/ui/pagination/model'
import { fetchWithCache } from '@/shared/composables/cache/model'
import { weatherIcons } from '@/shared/composables/iconsAndTemperatureAndDirections'
import { temperatureRanges } from '@/shared/composables/iconsAndTemperatureAndDirections'
import { getWindDirection } from '@/shared/composables/iconsAndTemperatureAndDirections'

import { PaginationComponent } from '@/shared/ui/pagination/ui'

import { IconPressure, IconHumidity } from '@/shared/assets/image/svg/humidity-and-pressure'

const { isGeolocationEnabled, latitude, longitude, error: geoError } = useGeolocation()
const { error: fetchError } = useFetch()
const isLoading = ref(false)
const rawResponse = ref<string | null>(null)

const temperFaringate = 273.15

const fetchWeather = async () => {
  if (latitude.value && longitude.value) {
    const url = generateHourlyWeather(urlBase, latitude.value, longitude.value, token)
    isLoading.value = true
    try {
      const data = await fetchWithCache(url)
      rawResponse.value = JSON.stringify(data)
    } catch (err) {
      console.error('Failed to fetch weather data Hourly component', err)
      if (err instanceof TypeError) {
        console.error('Network Error: ', err.message)
      }
    } finally {
      isLoading.value = false
    }
  }
}

watch([latitude, longitude], fetchWeather)
watch(isGeolocationEnabled, async (newValue) => {
  if (newValue) {
    await fetchWeather()
  }
})

const parsedResponse = computed(() => {
  return rawResponse.value ? JSON.parse(rawResponse.value) : null
})

const weatherIconMap = (iconCode: string) => weatherIcons.get(iconCode) ?? null

// Pagination logic
const paginatedList: any = computed(() => (parsedResponse.value ? parsedResponse.value.list : []))
const itemsPerPage = 5
const { currentPage, totalPages, paginatedData, nextPage, prevPage } = usePagination(
  paginatedList,
  itemsPerPage
)

// Function to get the color class based on temperature in Celsius
const getTemperatureColor = (tempCelsius: number): string => {
  for (const range of temperatureRanges) {
    if (tempCelsius >= range.min && tempCelsius <= range.max) {
      return range.color
    }
  }
  return 'text-stone-300' // default color
}

onMounted(async () => {
  await nextTick()
  if (isGeolocationEnabled.value) {
    await fetchWeather()
  }
})
</script>

<template>
  <div>
    <!-- Display geolocation or fetch errors -->
    <div v-if="geoError" class="text-red-500">{{ geoError }}</div>
    <div v-else class="text-red-500">{{ fetchError }}</div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="flex justify-center items-center h-20">
      <div
        class="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>
      <div class="text-stone-300">Loading ...</div>
    </div>

    <!-- Display weather data if available -->
    <div v-if="parsedResponse">
      <div v-if="parsedResponse.city">
        <div class="city flex justify-center my-4">
          <h1 class="text-2xl dark:text-gray-400">
            City: {{ parsedResponse.city.name }}, {{ parsedResponse.city.country }}
          </h1>
        </div>

        <!-- Sunrise and sunset times -->
        <div class="city-sun_sun flex justify-evenly my-8 text-slate-700 dark:text-slate-400">
          <p>Sunrise: {{ new Date(parsedResponse.city.sunrise * 1000).toLocaleTimeString() }}</p>
          <p>Sunset: {{ new Date(parsedResponse.city.sunset * 1000).toLocaleTimeString() }}</p>
        </div>
      </div>

      <!-- Paginated weather forecast data -->
      <div v-if="paginatedData && paginatedData.length > 0">
        <div
          class="flex justify-between items-center max-w-screen-sm mx-auto px-4 mt-6"
          v-for="(forecast, index) in paginatedData"
          :key="index"
        >
          <!-- Date and time formatting -->
          <div class="date-format flex flex-col dark:text-gray-400">
            <div class="flex flex-row">
              <div>
                <p>{{ new Date(forecast.dt * 1000).getHours().toString().padStart(2, '0') }}:</p>
              </div>
              <div>
                <p>
                  {{ new Date(forecast.dt * 1000).getMinutes().toString().padStart(2, '0') }}
                </p>
              </div>
            </div>
            <div class="flex flex-row">
              <div>
                <p>
                  {{
                    new Date(forecast.dt * 1000).toLocaleDateString('ru-RU', {
                      day: '2-digit'
                    })
                  }}
                </p>
              </div>
              <div>
                <p>/</p>
              </div>
              <div>
                <p>
                  {{
                    new Date(forecast.dt * 1000).toLocaleDateString('ru-RU', {
                      month: '2-digit'
                    })
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Temperature, humidity, pressure, and wind data -->
          <div class="flex flex-wrap items-center justify-center">
            <div class="temperature flex flex-col text-sm sm:text-sm md:text-base">
              <p :class="getTemperatureColor(forecast.main.temp - temperFaringate)">
                {{ (forecast.main.temp - temperFaringate).toFixed(1) }}&nbsp;°C&nbsp;
              </p>
              <div class="dark:text-gray-400 flex items-center">
                <component :is="IconHumidity" class="w-2 h-4 mr-1 flex-no-shrink fill-current" />
                <p class="dark:text-gray-400 text-xs sm:text-sm md:text-base">
                  {{ Math.round(forecast.main.humidity) }}%
                </p>
              </div>
            </div>

            <!-- Pressure -->
            <div class="dark:text-stone-400">
              <div class="dark:text-gray-400 flex items-center text-xs sm:text-sm md:text-base">
                <component :is="IconPressure" class="w-5 h-5 mr-1 hidden sm:block" />
                <p class="dark:text-gray-400 text-xs hidden sm:block sm:text-sm md:text-base">
                  {{ forecast.main.pressure }}&nbsp;hpa&nbsp;
                </p>
              </div>
              <!-- Wind direction -->
              <p class="text-xs sm:text-sm hidden sm:block md:text-base">
                &nbsp;{{ forecast.wind.speed.toFixed(1) }}&nbsp;
                <span v-if="forecast.wind.gust != null"
                  >({{ forecast.wind.gust.toFixed(1) }}) m/s</span
                >
                <span v-if="forecast.wind?.deg != null">
                  <component
                    :is="getWindDirection(forecast.wind.deg).icon"
                    class="inline-block w-5 h-5 align-middle"
                  />
                  {{ getWindDirection(forecast.wind.deg).name }}
                </span>
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <!-- Weather and icon -->
            <div class="description">
              <div>
                <p class="dark:text-gray-400 hidden sm:block">
                  {{ forecast.weather[0].description }}
                </p>
              </div>
            </div>
            <div class="description-icon flex flex-col img-container h-4 w-4">
              <component :is="weatherIconMap(forecast.weather[0].icon)" class="weather-icon" />
            </div>
          </div>
        </div>
      </div>
      <PaginationComponent
        class="flex justify-center mt-6 dark:text-gray-400"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :nextPage="nextPage"
        :prevPage="prevPage"
      />
    </div>
  </div>
</template>
