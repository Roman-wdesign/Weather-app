<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import TheInput from '@/shared/components/TheInput.vue';
import { dateBuilder } from '@/helpers/DateBuilder';
import { useFetch } from '@/shared/composables/Fetch'
import { genOpenWeatherURL } from '@/helpers/vars'
import { imgOpenWeatherURL } from '@/helpers/vars'

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

const fetchWeather = async () => {
  const apiUrl = `${urlBase}weather?q=${theQuery.value}&units=metric&APPID=${token}&lang={ru}`;

  await fetchData(apiUrl);
  if (data.value) {
    setResults(data.value);
  }
}

onMounted(async () => {
  await fetchWeather();
  console.log('Weather List was mounted');
})

</script>

<template>
  <div class="container mx-auto px-4">
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error }}</p>
    <TheInput class="input border-2 text-black border-amber-800" @keydown.enter="fetchWeather" label="название города"
      v-model="theQuery">
    </TheInput>
    <div class="flex-col justify-between py-6">
      <div class="date">
        <h5 class="font-bold text-center italic text-sm">{{ dateBuilder() }}</h5>
      </div>
      <div class="weather-wrap" v-if="(typeof theWeather.main != 'undefined')">
        <div class="location-box">
          <div class="location ">
            <h3 class="text-lg font-bold text-center">{{ theWeather.name }}, {{ theWeather.sys.country }}</h3>
          </div>
        </div>

      </div>
      <div class="weather-box py-3 flex-col justify-center" v-if="(typeof theWeather.main != 'undefined')">
        <div class="temp flex justify-center py-3">
          <h2 class="text-2xl font-extrabold">{{ Math.round(theWeather.main.temp) }} °c</h2>
        </div>
        <div class=" flex items-center justify-between weather">
          <div class="div flex">
            <h4 class="font-bold">{{ theWeather.weather[0].main }}</h4>
          </div>
          <div class="div flex">
            <img class="w-[150] h-auto" :src="`${imgUrl}${theWeather.weather[0].icon}@2x.png`
      " />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>