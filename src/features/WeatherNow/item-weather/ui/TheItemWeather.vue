<script setup lang="ts">
import type { IWeather } from '@/features/WeatherNow/item-weather/model'

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

export interface Props {
  weather: IWeather
  imgUrl: string
}

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

function getAirQuality(aqi: number) {
  const quality = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']
  return quality[aqi - 1]
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
