<script setup lang="ts">
import { useWeatherNow } from '@/shared/composables/useWeatherNow'
import IconClose from '@/shared/components/icons/IconClose.vue'
import TheInput from '@/shared/components/TheInput.vue'
import TheButton from '@/shared/components/TheButton.vue'
import TheItemWeather from '@/components/weather/WeatherNow/TheItemWeather.vue'

const {
    getDate,
    savedCities,
    theQuery,
    theWeather,
    error,
    loading,
    imgUrl,
    fetchWeatherForQuery,
    isSaveDisabled,
    saveCurrentCity,
    removeCityFromStorage
} = useWeatherNow();

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key == 'Enter') {
        fetchWeatherForQuery.value;
    }
};
</script>

<template>
    <div class="grid grid-cols-1 gap-6 p-4">
        <!-- Date Display -->
        <div class="flex justify-center  py-6">
            <div class="max-w-xs  p-4 text-center">
                <h5 class="font-bold italic text-lg">{{ getDate }}</h5>
            </div>
        </div>

        <!-- Saved Cities -->
        <div class="saved-cities">
            <div v-if="savedCities.length !== 0" class="flex justify-center mb-2">
                <h3 class="text-xl font-semibold">Saved Cities</h3>
            </div>
            <ul class="flex flex-wrap justify-center gap-4">
                <li v-for="city in savedCities" :key="city" class="relative w-40">
                    <TheButton class="absolute top-0 right-0" @click="removeCityFromStorage(city)">
                        <IconClose class="w-3 h-5"></IconClose>
                    </TheButton>
                    <TheItemWeather v-if="theWeather[city]" :weather="theWeather[city]" :imgUrl="imgUrl"
                        class="w-full h-80 pt-10 border-2 rounded-md border-blue-500" />
                </li>
            </ul>
        </div>
        <!-- Input Field -->
        <div class="flex justify-center  p-4">
            <TheInput class="max-w-xs" @keydown.enter="handleKeyDown" label="название города" v-model="theQuery" />
        </div>

        <!-- Error and Loading Messages -->
        <div class="error-message display-hide flex justify-center my-4">
            <p v-if="loading">Loading...</p>
            <p v-if="error">Error: {{ error }}</p>
        </div>

        <!-- Queried Weather -->
        <div class="query_weather flex flex-col py-4">
            <div v-if="theWeather[theQuery]">
                <div class=" flex justify-center my-2">
                    <TheButton :disabled="isSaveDisabled" @click="saveCurrentCity"
                        class="w-auto  text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                        Save City
                    </TheButton>
                </div>
            </div>
            <div>
                <TheItemWeather v-if="theWeather[theQuery]" :weather="theWeather[theQuery]" :imgUrl="imgUrl"
                    class="w-full" />
            </div>
        </div>
    </div>
</template>
