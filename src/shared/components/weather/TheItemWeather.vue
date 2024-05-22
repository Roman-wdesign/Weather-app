<!-- <script setup lang="ts">

import { imgOpenWeatherURL } from '@/helpers/vars'
const imgUrl: string = imgOpenWeatherURL


export interface Props {
    weather__data: any
}
const props = defineProps<Props>()
</script>


<template>
    <div class="weather-wrap" v-if="(typeof props.theWeather.main != 'undefined')">
        <div class="location-box">
            <div class="location ">
                <h3 class="text-lg font-bold text-center">{{ props.theWeather.name }},
                    {{ props.theWeather.sys.country }}</h3>
            </div>
        </div>
    </div>
    <div class="weather-box py-3 flex-col justify-center" v-if="(typeof props.theWeather.main != 'undefined')">
        <div class="temp flex justify-center py-3">
            <h2 class="text-2xl font-extrabold">{{ Math.round(props.theWeather.main.temp) }} °c</h2>
        </div>
        <div class=" flex items-center justify-between weather">
            <div class="div flex">
                <h4 class="font-bold">{{ props.theWeather.weather[0].main }}</h4>
            </div>
            <div class="div flex">
                <img class="w-[150] h-auto" :src="`${imgUrl}${props.theWeather.weather[0].icon}@2x.png`" />
            </div>
        </div>
    </div>
</template> -->