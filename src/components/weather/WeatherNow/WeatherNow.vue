<script setup lang="ts">
import { useWeatherNow } from '@/shared/composables/useWeatherNow'
import TheInput from '@/shared/components/TheInput.vue';
import TheButton from '@/shared/components/TheButton.vue';
import TheItemWeather from '@/components/weather/WeatherNow/TheItemWeather.vue';

const {
    getDate,
    savedCities,
    theQuery,
    theWeather,
    error,
    loading,
    imgUrl,
    fetchWeatherForQuery,
    saveCurrentCity,
    removeCityFromStorage
} = useWeatherNow();

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key == 'Enter') {
        fetchWeatherForQuery.value;
    }
};;


</script>

<template>
    <div class="container mx-auto px-4">
        <div v-if="theWeather[theQuery]">
            <TheButton @click="saveCurrentCity">Save City</TheButton>
            <h3>Saved Cities</h3>
        </div>
        <div class="saved-cities">
            <ul>
                <li v-for="city in savedCities" :key="city">
                    <div>
                        <div class="div flex">
                            {{ city }}
                            <TheButton @click="removeCityFromStorage(city)">X</TheButton>
                        </div>
                        <TheItemWeather v-if="theWeather[city]" :weather="theWeather[city]" :imgUrl="imgUrl" />
                    </div>
                </li>
            </ul>
        </div>
        <p v-if="loading">Loading...</p>
        <p v-if="error">Error: {{ error }}</p>
        <TheInput @keydown.enter="handleKeyDown"
            class="bg-gray-50 border border-grayfetchWeather-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            label="название города" v-model="theQuery">
        </TheInput>
        <div class="flex-col justify-between py-6">
            <div class="date">
                <h5 class="font-bold text-center italic text-sm">{{ getDate }}</h5>
            </div>
            <TheItemWeather v-if="theWeather[theQuery]" :weather="theWeather[theQuery]" :imgUrl="imgUrl">
            </TheItemWeather>
        </div>
    </div>
</template>
