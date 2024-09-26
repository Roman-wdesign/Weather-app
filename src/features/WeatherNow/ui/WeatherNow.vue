<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { useWeatherNow } from '@/features/WeatherNow/model/useWeatherNow'
import { dateBuilder } from '@/shared/api/helpers/date-builder'

import { useDragAndDrop } from '@/shared/composables/drag-drop'
import { IconClose } from '@/shared/assets/image/svg/close'

import { TheInput } from '@/shared/ui/inputs'
import { TheButton } from '@/shared/ui/buttons/main-btn'
import { TheItemWeather } from '@/features/WeatherNow/item-weather'
import { BarsFour } from '@/shared/assets/image/svg/dragable'

const getDate = ref(dateBuilder())

const {
    savedCities,
    theQuery,
    theWeather,
    error,
    loading,
    imgUrl,
    fetchWeatherForQuery,
    isSaveDisabled,
    saveCurrentCity,
    removeCityFromStorage,
} = useWeatherNow()

const { handleDragStart, handleDragOver, handleDrop } = useDragAndDrop(savedCities)

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        fetchWeatherForQuery.value
    }
};

watchEffect(() => {
    if (error.value) {
        const showError = error.value
        setTimeout(() => {
            error.value = null
        }, 2000);
    }
});
</script>

<template>
    <div class="grid grid-cols-1 gap-6 p-4">
        <!-- Date Display -->
        <div class="flex justify-center py-6">
            <div class="max-w-xs p-4 text-center">
                <h5 class="font-bold italic text-lg dark:text-white">{{ getDate }}</h5>
            </div>
        </div>

        <!-- Input Field -->
        <div class="flex justify-center p-4">
            <TheInput class="max-w-xs" @keydown.enter="handleKeyDown" label="city name" v-model="theQuery" />
        </div>

        <!-- Error and Loading Messages -->
        <div class="error-message flex justify-center my-4">
            <p class="dark:text-gray-50" v-if="loading">Loading...</p>
            <p class="dark:text-gray-50" v-if="error">Error: {{ error }}</p>
        </div>

        <!-- Queried Weather -->
        <div v-if="theWeather[theQuery]" class="query_weather flex flex-col py-4">
            <div>
                <div class="flex justify-center my-2">
                    <TheButton :disabled="isSaveDisabled" @click="saveCurrentCity(theQuery)"
                        class="w-auto text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                        Save City
                    </TheButton>
                </div>
            </div>
            <div>
                <TheItemWeather v-if="theWeather[theQuery]" :weather="theWeather[theQuery]" :imgUrl="imgUrl" />
            </div>
        </div>

        <!-- Saved Cities -->
        <div v-if="savedCities.length !== 0" class="saved-cities">
            <div class="flex justify-center mb-2">
                <h3 class="text-xl font-semibold dark:text-gray-400">Saved Cities</h3>
            </div>
            <ul class="flex flex-wrap justify-center gap-4">
                <li v-for="(city, index) in savedCities" :key="city" :data-index="index" class="relative min-w-40"
                    draggable="true" @dragstart="handleDragStart" @dragover="handleDragOver" @drop="handleDrop">
                    <IconClose
                        class="absolute top-0 right-0 w-8 h-8 rounded-full fill-blue-600 hover:fill-blue-500 cursor-pointer"
                        @click="removeCityFromStorage(city)">
                    </IconClose>
                    <div>
                        <BarsFour class="absolute top-2 left-2 hover: cursor-pointer" />
                    </div>
                    <TheItemWeather v-if="theWeather[city]" :weather="theWeather[city]" :imgUrl="imgUrl"
                        class="w-full h-80 pt-10 border-2 rounded-md border-blue-500">
                    </TheItemWeather>
                </li>
            </ul>
        </div>
    </div>
</template>