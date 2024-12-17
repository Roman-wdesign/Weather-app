<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue'
import { useGeolocation } from '@/shared/composables/geolocation/model'
import { useFetch } from '@/shared/composables/fetch/api'
import { generateHourlyWeather } from '@/features/WeatherHourly/main-component/api'
import { urlBase, token } from '@/shared/config'
import { usePagination } from '@/shared/ui/pagination/model'
import { fetchWithCache } from '@/shared/composables/cache/model'

import { PaginationComponent } from '@/shared/ui/pagination/ui'

import { IconPressure, IconHumidity } from '@/shared/assets/image/svg/humidity-and-pressure'

import {
  IconNorth,
  IconNorthEast,
  IconEast,
  IconSouthEast,
  IconSouth,
  IconSouthWest,
  IconWest,
  IconNorthWest
} from '@/shared/assets/image/svg/wind-directions'

import {
  IconBrokenCloudsDay,
  IconClearSkyDay,
  IconFewCloudsDay,
  IconScatteredCloudsDay,
  IconShowerRainDay,
  IconThunderstormDay,
  IconRainDay,
  IconSnowDay,
  IconMistDay
} from '@/shared/assets/image/svg/condtitions/day'

import {
  IconBrokenCloudsNight,
  IconClearSkyNight,
  IconFewCloudsNight,
  IconScatteredCloudsNight,
  IconShowerRainNight,
  IconThunderstormNight,
  IconRainNight,
  IconSnowNight,
  IconMistNight
} from '@/shared/assets/image/svg/condtitions/night'

const { isGeolocationEnabled, latitude, longitude, error: geoError } = useGeolocation()
const { error: fetchError } = useFetch()

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

function getWindDirection(angle: number): { name: string; icon: any } {
  const directions = [
    { name: 'N', icon: IconNorth },
    { name: 'NE', icon: IconNorthEast },
    { name: 'E', icon: IconEast },
    { name: 'SE', icon: IconSouthEast },
    { name: 'S', icon: IconSouth },
    { name: 'SW', icon: IconSouthWest },
    { name: 'W', icon: IconWest },
    { name: 'NW', icon: IconNorthWest }
  ]
  return directions[Math.round(angle / 45) % 8]
}

const weatherIconMap = (iconCode: string) => {
  const conditions = [
    { nameCondition: '01d', icon: IconClearSkyDay },
    { nameCondition: '01n', icon: IconClearSkyNight },
    { nameCondition: '02d', icon: IconFewCloudsDay },
    { nameCondition: '02n', icon: IconFewCloudsNight },
    { nameCondition: '03d', icon: IconScatteredCloudsDay },
    { nameCondition: '03n', icon: IconScatteredCloudsNight },
    { nameCondition: '04d', icon: IconBrokenCloudsDay },
    { nameCondition: '04n', icon: IconBrokenCloudsNight },
    { nameCondition: '09d', icon: IconShowerRainDay },
    { nameCondition: '09n', icon: IconShowerRainNight },
    { nameCondition: '10d', icon: IconRainDay },
    { nameCondition: '10n', icon: IconRainNight },
    { nameCondition: '11d', icon: IconThunderstormDay },
    { nameCondition: '11n', icon: IconThunderstormNight },
    { nameCondition: '13d', icon: IconSnowDay },
    { nameCondition: '13n', icon: IconSnowNight },
    { nameCondition: '50d', icon: IconMistDay },
    { nameCondition: '50n', icon: IconMistNight }
  ]
  const condition = conditions.find((c) => c.nameCondition === iconCode) || null
  return condition ? condition.icon : null
}

// Pagination logic
const paginatedList: any = computed(() => (parsedResponse.value ? parsedResponse.value.list : []))
const itemsPerPage = 5
const { currentPage, totalPages, paginatedData, nextPage, prevPage } = usePagination(
  paginatedList,
  itemsPerPage
)

const temperFaringate = 273.15

type TemperatureRange = {
  min: number
  max: number
  color: string
}

const temperatureRanges: TemperatureRange[] = [
  { min: -Infinity, max: -60, color: 'text-fuchsia-900' }, // yakut winter
  { min: -59.9, max: -49.9, color: 'text-purple-800' }, // arctic winter
  { min: -49.9, max: -39.9, color: 'text-violet-600' }, // siberian winter
  { min: -39.9, max: -29.9, color: 'text-violet-500' }, // ural winter
  { min: -29.9, max: -19.9, color: 'text-indigo-400' }, // asian winter
  { min: -19.9, max: -9.9, color: 'text-cyan-300' }, // europian winter
  { min: -9.9, max: -4.9, color: 'text-sky-400' },
  { min: -4.9, max: -0.1, color: 'text-cyan-400' },
  { min: -0.1, max: -0.0, color: 'text-neutral-900 dark:text-neutral-200' }, // - 0
  { min: 0.0, max: 0.1, color: 'text-zinc-900 dark:text-zinc-500' }, // 0
  { min: 0.2, max: 5.1, color: 'text-emerald-400' }, // arctic spring
  { min: 5.2, max: 10.1, color: 'text-lime-400' }, //  siberian spring
  { min: 10.2, max: 15.1, color: 'text-yellow-400' }, // europian spring
  { min: 15.2, max: 20.1, color: 'text-amber-300' },
  { min: 20.2, max: 35.1, color: 'text-orange-600' }, // miami summer
  { min: 35.1, max: 40.1, color: 'text-pink-600' }, // turkmenistan summer
  { min: 40.2, max: Infinity, color: 'text-rose-600' } // quatar summer
]

const getTemperatureColor = (tempCelsius: number): string => {
  for (const range of temperatureRanges) {
    if (tempCelsius >= range.min && tempCelsius <= range.max) {
      return range.color
    }
  }
  return 'text-stone-300' // default color
}
</script>

<template>
  <div>
    <div v-if="geoError" class="text-red-500">{{ geoError }}</div>
    <div v-else class="text-red-500">{{ fetchError }}</div>

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
        <div class="city-sun_sun flex justify-evenly my-8 text-slate-700 dark:text-slate-400">
          <p>Sunrise: {{ new Date(parsedResponse.city.sunrise * 1000).toLocaleTimeString() }}</p>
          <p>Sunset: {{ new Date(parsedResponse.city.sunset * 1000).toLocaleTimeString() }}</p>
        </div>
      </div>
      <div v-if="paginatedData && paginatedData.length > 0">
        <div class="flex justify-between items-center max-w-screen-sm mx-auto px-4 mt-6"
          v-for="(forecast, index) in paginatedData" :key="index">
          <!-- date format -->
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
          <div class="flex flex-wrap items-center justify-center">
            <!-- temperature -->
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

            <!-- pressure -->
            <div class="dark:text-stone-400">
              <div class="dark:text-gray-400 flex items-center text-xs sm:text-sm md:text-base">
                <component :is="IconPressure" class="w-5 h-5 mr-1 hidden sm:block" />
                <p class="dark:text-gray-400 text-xs hidden sm:block sm:text-sm md:text-base">
                  {{ forecast.main.pressure }}&nbsp;hpa&nbsp;
                </p>
              </div>
              <!-- wind direction -->
              <p class="text-xs sm:text-sm hidden sm:block md:text-base">
                &nbsp;{{ forecast.wind.speed.toFixed(1) }}&nbsp;
                <span v-if="forecast.wind.gust != null">({{ forecast.wind.gust.toFixed(1) }}) m/s</span>
                <span v-if="forecast.wind?.deg != null">
                  <component :is="getWindDirection(forecast.wind.deg).icon" class="inline-block w-5 h-5 align-middle" />
                  {{ getWindDirection(forecast.wind.deg).name }}
                </span>
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <!-- description -->
            <div class="description">
              <div>
                <p class="dark:text-gray-400 hidden sm:block">
                  {{ forecast.weather[0].description }}
                </p>
              </div>
            </div>
            <!-- description-icon -->
            <div class="description-icon flex flex-col img-container h-4 w-4">
              <component :is="weatherIconMap(forecast.weather[0].icon)" class="weather-icon" />
            </div>
          </div>
        </div>
      </div>
      <PaginationComponent class="flex justify-center mt-6 dark:text-gray-400" :currentPage="currentPage"
        :totalPages="totalPages" :nextPage="nextPage" :prevPage="prevPage" />
    </div>
    <div v-else>
      <p class="dark:text-gray-50">Loading...</p>
    </div>
  </div>
</template>
