<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue'
import { useGeolocation } from '@/shared/composables/useGeolocation'
import { useFetch } from '@/shared/composables/useFetch'
import { generateHourlyWeather } from '@/shared/api/helpers/generateHourlyWeather'
import { urlBase, token, imgUrl } from '@/shared/config/vars'
import { usePagination } from '@/shared/composables/usePagination'
import { fetchWithCache } from '@/shared/composables/cache/useCache'

import { PaginationComponent } from '@/shared/ui/pagination'

const { isGeolocationEnabled, latitude, longitude, error: geoError } = useGeolocation()
const { error } = useFetch()

const rawResponse = ref<string | null>(null)

const fetchWeather = async () => {

    if (latitude.value !== null && longitude.value !== null) {
        const url = generateHourlyWeather(urlBase, latitude.value, longitude.value, token)
        console.log(url);
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
const { currentPage, totalPages, paginatedData, nextPage, prevPage } = usePagination(paginatedList, itemsPerPage)
</script>

<template>
    <div>
        <div v-if="geoError" class="text-red-500">{{ geoError }}</div>
        <div v-else="error" class="text-red-500">{{ error }}</div>

        <div v-if="parsedResponse">
            <!-- <p>Coordinates: {{ parsedResponse.city.coord.lat }}, {{ parsedResponse.city.coord.lon }}</p>
                <p>Population: {{ parsedResponse.city.population }}</p>
                <p>Timezone: {{ parsedResponse.city.timezone }}</p> -->
            <div v-if="parsedResponse.city">
                <div class="city flex justify-center my-4">
                    <h1 class="text-2xl dark:text-gray-400">City: {{ parsedResponse.city.name }}, {{
                        parsedResponse.city.country }}</h1>
                </div>
                <div class=" city-sun_sun flex justify-evenly my-8 dark:text-gray-400">
                    <p>Sunrise: {{ new Date(parsedResponse.city.sunrise * 1000).toLocaleTimeString() }}</p>

                    <p>Sunset: {{ new Date(parsedResponse.city.sunset * 1000).toLocaleTimeString() }}</p>
                </div>

            </div>
            <div v-if="paginatedData && paginatedData.length > 0">
                <div v-for="(forecast, index) in paginatedData" :key="index">
                    <div class="screen-container flex justify-center items-center">
                        <div class="temp-date flex mr-6 gap-4">
                            <div class=" dark:text-gray-400">
                                <strong>{{ new Date(forecast.dt * 1000).toLocaleString() }}
                                </strong>
                            </div>

                            <div>
                                <p class="dark:text-stone-400"> {{ (forecast.main.temp - 273.15).toFixed(1) }}°C</p>
                            </div>

                        </div>

                        <div class="description-icon flex flex-row items-center">
                            <div>
                                <p class="dark:text-gray-400">{{ forecast.weather[0].description }}</p>
                            </div>

                            <div class="img-container h-16 w-16"><img :src="`${imgUrl}${forecast.weather[0].icon}@2x.png`"
                                    alt="Weather Icon" /></div>
                        </div>
                    </div>

                </div>
                <PaginationComponent class="flex justify-center mt-6 dark:text-gray-400" :currentPage="currentPage"
                    :totalPages="totalPages" :nextPage="nextPage" :prevPage="prevPage" />
            </div>
            <div v-else>
                <p>No forecast data available.</p>
            </div>
        </div>
    </div>
</template>