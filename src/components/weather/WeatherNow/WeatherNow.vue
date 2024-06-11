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
};;


</script>

<template>

    <div class="grid gap-2">
        <div class="saved-cities">
            <ul class="flex flex-row flex-wrap gap-4">
                <li v-for="city in savedCities" :key="city">
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
        <div class="button" v-if="theWeather[theQuery]">
            <div>
                <TheButton :disabled="isSaveDisabled" @click="saveCurrentCity">Save City</TheButton>
            </div>
            <h3>Saved Cities</h3>
        </div>
        <div class="error-message flex flex-col">
            <p v-if="loading">Loading...</p>
            <p v-if="error">Error: {{ error }}</p>
        </div>

        <div class="input ">
            <TheInput class="max-w-32 min-w-24" @keydown.enter="handleKeyDown" label="название города"
                v-model="theQuery">
            </TheInput>
        </div>
        <div class="flex-col grow-0 py-6">
            <div class="date">
                <h5 class="font-bold text-center italic text-sm">{{ getDate }}</h5>
            </div>
            <TheItemWeather v-if="theWeather[theQuery]" :weather="theWeather[theQuery]" :imgUrl="imgUrl">
            </TheItemWeather>
        </div>
    </div>

</template>