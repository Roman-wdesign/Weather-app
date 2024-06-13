<script setup lang="ts">
import { useWeatherNow } from '@/shared/composables/useWeatherNow'
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
    <div class="grid grid-flow-row-dense grid-cols-1 grid-rows-auto">
        <div class="saved-cities mt-6">
            <div v-if="savedCities.length !== 0" class="flex justify-center my-4">
                <h3>Saved Cities</h3>
            </div>
            <ul class="flex flex-row flex-wrap justify-center gap-4">
                <li class="mx-2" v-for="city in savedCities" :key="city">
                    <div>
                        <div class="relative">
                            <TheButton class="absolute top-0 right-0" @click="removeCityFromStorage(city)">x
                            </TheButton>
                        </div>
                        <div>
                            <TheItemWeather class="w-40 h-80 border-2 rounded-md  border-blue-500"
                                v-if="theWeather[city]" :weather="theWeather[city]" :imgUrl="imgUrl" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="flex justify-center my-4" v-if="theWeather[theQuery]">
            <div class="flex flex-col">
                <div>
                    <TheButton :disabled="isSaveDisabled" @click="saveCurrentCity">Save City
                    </TheButton>
                </div>
            </div>

        </div>
        <div class="input">
            <TheInput class="max-w-32 min-w-24" @keydown.enter="handleKeyDown" label="название города"
                v-model="theQuery">
            </TheInput>
        </div>
        <div class="error-message">
            <div class="flex flex-col">
                <p v-if="loading">Loading...</p>
                <p v-if="error">Error: {{ error }}</p>
            </div>
        </div>
        <div class="date flex bg-yellow-600 py-6">
            <div class="flex flex-auto max-w-32 min-w-24 justify-center  bg-neutral-600">
                <h5 class="font-bold italic text-sm">{{ getDate }}</h5>
            </div>
            <TheItemWeather v-if="theWeather[theQuery]" :weather="theWeather[theQuery]" :imgUrl="imgUrl">
            </TheItemWeather>
        </div>
    </div>
</template>