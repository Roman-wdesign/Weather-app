<script setup lang="ts">
import type { IWeather } from '@/features/WeatherNow/item-weather/model'

export interface Props {
  weather: IWeather
  imgUrl: string
}

function getWindDirection(angle: number) {
    const directions = ['⭡ N', '⭧ NE', '⭢ E', '⭨ SE', '⭣ S', '⭩ SW', '⭠ W', '⭦ NW'];
    return directions[Math.round(angle / 45) % 8];
}

const props = defineProps<Partial<Props>>()
</script>

<template>
  <div class="dark:bg-gray-800 dark:text-gray-400 px-3 h-auto">
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
        <h2 class="text-small font-extrabold">{{ Math.round(props.weather.main.temp) }} °c</h2>
      </div>
      <div class="pressure flex flex-col items-center py-3">
        <h2>Atmospheric pressure</h2>
        <h3 class="font-bold">{{ Math.round(props.weather.main.pressure) }} hPa</h3>
      </div>
      <div class="humidity flex flex-col items-center py-3">
        <h2>Humidity</h2>
        <h3 class=" font-bold">{{ Math.round(props.weather.main.humidity) }} %</h3>
      </div>
      <div class="temp flex justify-center py-3">
        <h2 class="text-small font-extrabold">
          {{ props.weather.wind.speed.toFixed(1) }}&nbsp;
          <template v-if="props.weather.wind.gust != null "> ({{ props.weather.wind.gust.toFixed(1) }})&nbsp;</template>
          m/s
          {{getWindDirection(props.weather.wind.deg)}}
        </h2>
      </div>
      <div class="px-2">
        <div class="div flex justify-center">
          <h4 class="font-bold">{{ props.weather.weather[0].main }}</h4>
        </div>
        <div class="div flex justify-center">
          <img
            class="min-w-24 h-auto"
            :src="`${props.imgUrl}${props.weather.weather[0].icon}@2x.png`"
          />
        </div>
      </div>
    </div>
  </div>
</template>
