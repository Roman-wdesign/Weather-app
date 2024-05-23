<script setup lang="ts">

import { ref } from 'vue'
import type { Ref } from 'vue'

import { useLocalStorage } from '@/shared/composables/localStorage'
import { dateBuilder } from '@/helpers/DateBuilder';
import { useFetch } from '@/shared/composables/Fetch'
import { genOpenWeatherURL } from '@/helpers/vars'
import { imgOpenWeatherURL } from '@/helpers/vars'

import TheInput from '@/shared/components/TheInput.vue'
import TheButton from '@/shared/components/TheButton.vue'
import TheItemWeather from '@/shared/components/weather/TheItemWeather.vue';



const getDate = ref(dateBuilder())
const { storedValue: savedCities, setValue: saveCity, removeValue: removeCity } = useLocalStorage('savedCities', []);


//destructuring fetch
const { data, error, loading, fetchData } = useFetch();

const urlBase: string = genOpenWeatherURL
const imgUrl: string = imgOpenWeatherURL

//VITE is required in your env name
const token: string = import.meta.env.VITE_WEATHER_SECRET_API_KEY

const theQuery: Ref<string> = ref<string>('')
const theWeather: Ref<any> = ref({});


const setResults = (results: any) => {
  theWeather.value = results
}

const showSaveButton = ref<boolean>(false);


const fetchWeather = async () => {
  const apiUrl = `${urlBase}weather?q=${theQuery.value}&units=metric&APPID=${token}`;
  await fetchData(apiUrl);
  if (data.value) {
    showSaveButton.value = true;
    setResults(data.value);
  }
}
const saveCurrentCity = () => {
  if (theWeather.value && theWeather.value.name) {
    saveCity([...savedCities.value, theWeather.value.name]);
  }
}
const removeCityFromStorage = (city: string) => {
  saveCity(savedCities.value.filter((savedCity: string) => savedCity !== city));
}

</script>

<template>
  <div class="container mx-auto px-4">

    <TheButton @click="saveCurrentCity">Save City</TheButton>
    <div class="saved-cities">
      <h3>Saved Cities</h3>
      <ul>
        <li v-for="city in savedCities" :key="city">
          {{ city }}
          <TheButton @click="removeCityFromStorage(city)">Remove</TheButton>
        </li>
      </ul>
    </div>

    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error }}</p>
    <TheInput class="input border-2 text-black border-amber-800" @keydown.enter="fetchWeather" label="название города"
      v-model="theQuery">
    </TheInput>
  </div>
  <div class="flex-col justify-between py-6">
    <div class="date">
      <h5 class="font-bold text-center italic text-sm">{{ getDate }}</h5>
    </div>
    <TheItemWeather v-if="theWeather.main" :weather="theWeather" :imgUrl="imgUrl"></TheItemWeather>
  </div>
</template>