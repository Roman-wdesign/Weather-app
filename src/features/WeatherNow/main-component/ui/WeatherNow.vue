<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'

import { useWeatherNow } from '@/features/WeatherNow/main-component/model'
import { dateBuilder } from '@/shared/api/helpers/date-builder/api'

import { useDragAndDrop } from '@/features/WeatherNow/main-component/lib'
import { IconClose } from '@/shared/assets/image/svg/close'

import { TheInput } from '@/shared/ui/inputs'
//import { TheButton } from '@/shared/ui/buttons/main-btn'
import { TheItemWeather } from '@/features/WeatherNow/item-weather/ui'
import { BarsFour } from '@/shared/assets/image/svg/dragable'

const getDate = ref(dateBuilder())

const {
  savedCities, // Array of cities saved by the user
  suggestions, // List of autocomplete suggestions
  theQuery, // Input value for the city search
  theWeather, // Weather data fetched for a specific city
  error, // Error message if any during fetch
  loading, // Loading state for the fetch process
  imgUrl, // URL for the weather icon image
  fetchWeatherForQuery, // Method to fetch weather data for a city
  fetchAirPollutionForQuery, // Method to fetch air pollution data for a city
  isSaveDisabled, // Boolean to disable "Save City" button
  saveCurrentCity, // Method to save the current city to storage
  removeCityFromStorage // Method to remove a city from storage
} = useWeatherNow()

// Extract drag-and-drop methods for the saved cities
const { handleDragStart, handleDragOver, handleDrop } = useDragAndDrop(savedCities)

// Event handler for pressing Enter in the input field
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    fetchWeatherForQuery
    fetchAirPollutionForQuery
  }
}

// Select and save city from autocomplete suggestions
const selectCity = async () => {
  saveCurrentCity(theQuery.value)
  theQuery.value = ''
}

// Watch effect to reset the error message after 2 seconds
watchEffect(() => {
  if (error.value) {
    setTimeout(() => {
      error.value = null
    }, 2000)
  }
})

onMounted(async () => {
  try {
    await fetchWeatherForQuery()
    await fetchAirPollutionForQuery()
  } catch (error) {
    console.error('Error async load ddata', error)
  }
})
</script>

<template>
  <div class="grid grid-cols-1 gap-6 p-4">
    <!-- Date Display -->
    <div class="flex justify-center py-6">
      <div class="max-w-xs text-center">
        <h5 class="font-bold italic text-lg dark:text-white">{{ getDate }}</h5>
      </div>
    </div>

    <!-- Input Field and Autocomplete Dropdown -->
    <div class="flex justify-center p-4">
      <TheInput
        v-if="!isSaveDisabled"
        class="max-w-xs"
        @keydown.enter="handleKeyDown"
        label="city name"
        v-model="theQuery"
        :disabled="isSaveDisabled"
      />
      <ul
        v-if="suggestions.length"
        class="absolute max-w-xs bg-white shadow-lg rounded-md mt-12 border border-gray-300"
      >
        <li
          v-for="(city, index) in suggestions"
          :key="index"
          @mousedown="selectCity()"
          class="cursor-pointer p-2 hover:bg-gray-200"
        >
          {{ city }}
        </li>
      </ul>
    </div>

    <!-- Error and Loading Messages -->
    <div class="error-message flex justify-center my-4">
      <p class="dark:text-gray-50" v-if="loading">Loading...</p>
      <p class="dark:text-gray-50" v-if="error">Error: {{ error }}</p>
    </div>

    <!-- Queried Weather -->
    <div v-if="theWeather[theQuery]" class="query_weather flex flex-col py-4">
      <div>
        <div class="flex justify-center my-2"></div>
      </div>
      <div>
        <TheItemWeather
          v-if="theWeather[theQuery]"
          :weather="theWeather[theQuery]"
          :imgUrl="imgUrl"
        />
      </div>
    </div>

    <!-- Saved Cities -->
    <div v-if="savedCities.length !== 0" class="saved-cities">
      <div class="flex justify-center mb-2">
        <h3 class="text-xl font-semibold dark:text-gray-400">Saved Cities</h3>
      </div>
      <ul class="flex flex-wrap justify-center gap-4">
        <li
          v-for="(city, index) in savedCities"
          :key="city"
          :data-index="index"
          class="relative min-w-40"
          draggable="true"
          @dragstart="handleDragStart"
          @dragover="handleDragOver"
          @drop="handleDrop"
        >
          <IconClose
            class="absolute top-0 right-0 w-8 h-8 rounded-full fill-orange-tomato hover:fill-white dark:fill-gray-500 dark:hover:fill-blue-300 cursor-pointer"
            @click="removeCityFromStorage(city)"
          >
          </IconClose>
          <div>
            <BarsFour class="absolute top-2 left-2 cursor-grab dark:bg-gray-700" />
          </div>
          <TheItemWeather
            v-if="theWeather[city]"
            :weather="theWeather[city]"
            :imgUrl="imgUrl"
            class="w-full pt-10 rounded-md bg-orange-fruit text-white dark:bg-gray-700 dark:text-gray-400 px-3 h-auto"
          >
          </TheItemWeather>
        </li>
      </ul>
    </div>
  </div>
</template>
