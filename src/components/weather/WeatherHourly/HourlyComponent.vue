<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue'
import { useGeolocation } from '@/shared/composables/useGeolocation'
import { useFetch } from '@/shared/composables/useFetch'
import { generateHourlyWeather } from '@/helpers/generateHourlyWeather'
import { genOpenWeatherURL, token, imgUrl } from '@/helpers/vars'
import { getCachedData, setCachedData } from '@/shared/composables/useCache'

const { isGeolocationEnabled, latitude, longitude, error: geoError } = useGeolocation()
const { data, error, fetchData } = useFetch()

const rawResponse = ref<string | null>(null)

const fetchWeather = async () => {


    if (latitude.value !== null && longitude.value !== null) {

        // use cache
        const cachedData = getCachedData('weatherData')
        if (cachedData) {
            rawResponse.value = JSON.stringify(cachedData)
            return
        }

        const url = generateHourlyWeather(genOpenWeatherURL, latitude.value, longitude.value, token)
        console.log("Fetching weather with URL:", url)  // Debug: URL log of response

        await fetchData(url)
        if (data.value) {

            // cache with TTL 1 hour
            setCachedData('weatherData', data.value, 3600000)
        }
        rawResponse.value = JSON.stringify(data.value)  // Save data to debug
        console.log("Fetched data:", rawResponse.value)  // Debug: data from API
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
</script>

<template>
    <div>
        <h1>Weather Data</h1>
        <div v-if="geoError" class="text-red-500">{{ geoError }}</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>

        <div v-else-if="parsedResponse">
            <div v-if="parsedResponse.city">
                <h2>City: {{ parsedResponse.city.name }}, {{ parsedResponse.city.country }}</h2>
                <p>Coordinates: {{ parsedResponse.city.coord.lat }}, {{ parsedResponse.city.coord.lon }}</p>
                <p>Population: {{ parsedResponse.city.population }}</p>
                <p>Timezone: {{ parsedResponse.city.timezone }}</p>
                <p>Sunrise: {{ new Date(parsedResponse.city.sunrise * 1000).toLocaleTimeString() }}</p>
                <p>Sunset: {{ new Date(parsedResponse.city.sunset * 1000).toLocaleTimeString() }}</p>
            </div>
            <div v-if="parsedResponse.list && parsedResponse.list.length > 0">
                <div v-for="(forecast, index) in parsedResponse.list" :key="index">
                    <p>{{ new Date(forecast.dt * 1000).toLocaleString() }}: {{ (forecast.main.temp - 273.15).toFixed(1)
                        }}°C</p>
                    <p>{{ forecast.weather[0].description }}</p>
                    <img :src="`${imgUrl}${forecast.weather[0].icon}@2x.png`" alt="Weather Icon">
                </div>
            </div>
            <div v-else>
                <p>No forecast data available.</p>
            </div>
        </div>
    </div>
</template>
