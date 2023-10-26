<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TheInput from '@/shared/components/TheInput.vue';
import { apiKeys } from '@/helpers/config';


const urlBase: string = 'https://api.openweathermap.org/data/2.5/'
const token: string = apiKeys.WEATHER_SECRET_API_KEY

const theQuery = ref<any>('')
let theWeather = ref<any>({})


const setResults = (results: any) => {
  theWeather.value = results
}

const fetchWeather = (e: any) => {
  if (e.key == 'Enter') {
    fetch(`${urlBase}weather?q=${theQuery.value}&units=metric&APPID=${token}&lang={ru}`)
      .then(response => {
        return response.json()
      }).then(setResults)
  }
}

const dateBuilder = () => {
  let d = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


onMounted(async () => {
  await fetchWeather('')
  console.log('Weather List was mounted')
})

</script>

<template>
  <div class="container mx-auto px-4">
    <TheInput @keypress="fetchWeather" label="название города" v-model="theQuery">
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
        <div class="weather">
          <h4 class="flex justify-center font-bold">{{ theWeather.weather[0].main }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
