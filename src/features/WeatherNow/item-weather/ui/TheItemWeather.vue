<script setup lang="ts">
import type { IWeather } from '@/features/WeatherNow/item-weather/model'

export interface Props {
    weather: IWeather
    imgUrl: string
}

const props = defineProps<Partial<Props>>()
</script>

<template>
    <div class="dark:bg-gray-800">
        <div class="weather-wrap" v-if="props.weather?.main">
            <div class="location-box">
                <div class="location px-2">
                    <div class="text-lg font-bold text-center flex flex-col justify-center">
                        <p>{{ props.weather.sys.country }}</p>
                        <p>{{ props.weather.name }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="weather-box py-3" v-if="props.weather?.main">
            <div class="temp flex justify-center py-3">
                <h2 class="text-2xl font-extrabold">
                    {{ Math.round(props.weather.main.temp) }} °c
                </h2>
            </div>
            <div class="px-2">
                <div class="div flex justify-center">
                    <h4 class="font-bold">{{ props.weather.weather[0].main }}</h4>
                </div>
                <div class="div flex justify-center">
                    <img class="min-w-24 h-auto" :src="`${props.imgUrl}${props.weather.weather[0].icon}@2x.png`" />
                </div>
            </div>
        </div>
    </div>
</template>
