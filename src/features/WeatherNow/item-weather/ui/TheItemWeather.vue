<script setup lang="ts">
import type { IWeather } from '@/features/WeatherNow/item-weather/model'

import { IconPressure, IconHumidity } from '@/shared/assets/image/svg/humidity-and-pressure'
import { weatherIcons } from '@/shared/composables/iconsAndTemperatureAndDirections'
import { getWindDirection } from '@/shared/composables/iconsAndTemperatureAndDirections'

export interface Props {
  weather: IWeather
  imgUrl: string
}

function getAirQuality(aqi: number) {
  const quality = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']
  return quality[aqi - 1]
}

const weatherIconMap = (iconCode: string) => weatherIcons.get(iconCode) ?? null

const props = defineProps<Partial<Props>>()
</script>

<template>
  <div>
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
      <div class="temp flex justify-center py-1">
        <h2 class="text-small font-extrabold">{{ Math.round(props.weather.main.temp) }} °c</h2>
      </div>
      <div class="pressure flex justify-center items-center py-3">
        <component :is="IconPressure" class="w-5 h-5 mr-1" />
        <h3 class="font-bold">{{ Math.round(props.weather.main.pressure) }} hPa</h3>
      </div>
      <div class="humidity flex justify-center items-center py-3">
        <component :is="IconHumidity" class="w-5 h-5 mr-1" />
        <h3 class="font-bold">{{ Math.round(props.weather.main.humidity) }} %</h3>
      </div>
      <div class="temp flex justify-center py-3">
        <h2 class="text-small font-extrabold">
          {{ props.weather.wind.speed.toFixed(1) }}&nbsp;
          <template v-if="props.weather.wind.gust != null">
            ({{ props.weather.wind.gust.toFixed(1) }})&nbsp;</template
          >
          m/s
          <span v-if="props.weather?.wind?.deg != null">
            <component
              :is="getWindDirection(props.weather.wind.deg).icon"
              class="inline-block w-5 h-5 align-middle"
            />
          </span>
          {{ getWindDirection(props.weather.wind.deg).name }}
        </h2>
      </div>
      <div class="px-2 flex items-center justify-center gap-2">
        <div class="div flex justify-center">
          <h4 class="font-bold">{{ props.weather.weather[0].main }}</h4>
        </div>
        <div class="div flex justify-center h-8 w-8">
          <component :is="weatherIconMap(props.weather.weather[0].icon)" class="weather-icon" />
        </div>
      </div>
      <div class="pollution flex justify-center py-1">
        <div class="text-small font-bold text-center flex flex-col justify-center">
          <p>
            <template v-if="props.weather?.list?.length > 0">Air quality:<br /></template>
          </p>
          <p>
            <template v-if="props.weather?.list?.length > 0">{{
              getAirQuality(props.weather.list[0].main.aqi)
            }}</template>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
