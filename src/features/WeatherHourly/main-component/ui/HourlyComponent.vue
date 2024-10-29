<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue'
import { useGeolocation } from '@/shared/composables/geolocation/model'
import { useFetch } from '@/shared/composables/fetch/api'
import { generateHourlyWeather } from '@/features/WeatherHourly/main-component/api'
import { urlBase, token, imgUrl } from '@/shared/config'
import { usePagination } from '@/shared/ui/pagination/model'
import { fetchWithCache } from '@/shared/composables/cache/model'

import { PaginationComponent } from '@/shared/ui/pagination/ui'

const { isGeolocationEnabled, latitude, longitude, error: geoError } = useGeolocation()
const { error } = useFetch()

const rawResponse = ref<string | null>(null)

const fetchWeather = async () => {
  if (latitude.value !== null && longitude.value !== null) {
    const url = generateHourlyWeather(urlBase, latitude.value, longitude.value, token)
    console.log(url)
    try {
      const data = await fetchWithCache(url)
      rawResponse.value = JSON.stringify(data)
    } catch (err) {
      console.error('Failed to fetch weather data Hourly component', err)
      if (err instanceof TypeError) {
        console.error('Network Error: ', err.message)
      }
    }
  }
}

watch([latitude, longitude], fetchWeather)
watch(isGeolocationEnabled, async (newValue) => {
  if (newValue) {
    await fetchWeather()
  }
})

onMounted(async () => {
  if (isGeolocationEnabled.value) {
    await fetchWeather()
  }
})

const parsedResponse = computed(() => {
  return rawResponse.value ? JSON.parse(rawResponse.value) : null
})

// Pagination logic
const paginatedList: any = computed(() => (parsedResponse.value ? parsedResponse.value.list : []))
const itemsPerPage = 5
const { currentPage, totalPages, paginatedData, nextPage, prevPage } = usePagination(
  paginatedList,
  itemsPerPage
)

const temperFaringate = 273.15

const polarwinter = -60
const yakutWinter = -50
const siberiaWinter = -40
const uralWinter = -30
const asianWinter = -20
const europeWinter = -10

const polarSpring = 10
const europeSpring = 15
const miamiSummer = 30
const bahrainSummer = 40

const getTemperatureColor = (tempCelsius: number) => {
  if (tempCelsius <= polarwinter) return 'text-fuchsia-900'
  if (tempCelsius <= yakutWinter) return 'text-purple-800'
  if (tempCelsius <= siberiaWinter) return 'text-violet-600'
  if (tempCelsius <= uralWinter) return 'text-violet-500'
  if (tempCelsius <= asianWinter) return 'text-indigo-400'
  if (tempCelsius <= europeWinter) return 'text-cyan-300'
  if (tempCelsius <= -0.1) return 'text-cyan-400'
  if (tempCelsius >= 0.1) return 'text-teal-400'
  if (tempCelsius >= polarSpring) return 'text-emerald-400'
  if (tempCelsius >= europeSpring) return 'text-lime-400'
  if (tempCelsius >= miamiSummer) return 'text-orange-600'
  if (tempCelsius >= bahrainSummer) return 'text-pink-600'
  return 'text-stone-300'
}
</script>

<template>
  <div>
    <div v-if="geoError" class="text-red-500">{{ geoError }}</div>
    <div v-else class="text-red-500">{{ error }}</div>

    <div v-if="parsedResponse">
      <!-- <p>Coordinates: {{ parsedResponse.city.coord.lat }}, {{ parsedResponse.city.coord.lon }}</p>
                <p>Population: {{ parsedResponse.city.population }}</p>
                <p>Timezone: {{ parsedResponse.city.timezone }}</p> -->
      <div v-if="parsedResponse.city">
        <div class="city flex justify-center my-4">
          <h1 class="text-2xl dark:text-gray-400">
            City: {{ parsedResponse.city.name }}, {{ parsedResponse.city.country }}
          </h1>
        </div>
        <div class="city-sun_sun flex justify-evenly my-8 dark:text-gray-400">
          <p>Sunrise: {{ new Date(parsedResponse.city.sunrise * 1000).toLocaleTimeString() }}</p>

          <p>Sunset: {{ new Date(parsedResponse.city.sunset * 1000).toLocaleTimeString() }}</p>
        </div>
      </div>
      <div v-if="paginatedData && paginatedData.length > 0">
        <div v-for="(forecast, index) in paginatedData" :key="index">
          <div class="screen-container px-2 flex justify-between items-center">
            <div class="temp-date flex mr-6 gap-4">
              <div class="dark:text-gray-400">
                <!-- date format -->
                <div class="flex flex-col">
                  <div>
                    <div class="flex flex-row">
                      <div>
                        <p>
                          {{ new Date(forecast.dt * 1000).getHours().toString().padStart(2, '0') }}:
                        </p>
                      </div>
                      <div>
                        <p>
                          {{
                            new Date(forecast.dt * 1000).getMinutes().toString().padStart(2, '0')
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="flex">
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
                </div>
              </div>

              <div class="flex items-center">
                <p :class="getTemperatureColor(forecast.main.temp - temperFaringate)">
                  {{ (forecast.main.temp - temperFaringate).toFixed(1) }}°C
                </p>
              </div>
            </div>

            <div class="description-icon flex flex-row items-center">
              <div>
                <p class="dark:text-gray-400">{{ forecast.weather[0].description }}</p>
              </div>

              <div class="img-container h-16 w-16">
                <img :src="`${imgUrl}${forecast.weather[0].icon}@2x.png`" alt="Weather Icon" />
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
      <div v-else>
        <p>No forecast data available.</p>
      </div>
    </div>
  </div>
</template>
