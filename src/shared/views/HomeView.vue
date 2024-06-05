<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import { useLocalStorage } from '@/shared/composables/localStorage';
import { dateBuilder } from '@/helpers/DateBuilder';
import { useFetch } from '@/shared/composables/fetch';
import { genOpenWeatherURL, imgOpenWeatherURL } from '@/helpers/vars';
import TheInput from '@/shared/components/TheInput.vue';
import TheButton from '@/shared/components/TheButton.vue';
import TheItemWeather from '@/shared/components/weather/TheItemWeather.vue';

const getDate = ref(dateBuilder());
const { storedValue: savedCities, setValue: saveCity } = useLocalStorage('savedCities', []);
if (!Array.isArray(savedCities.value)) {
  savedCities.value = [];
}

const { data, error, loading, fetchData } = useFetch();

const urlBase: string = genOpenWeatherURL;
const imgUrl: string = imgOpenWeatherURL;
const token: string = import.meta.env.VITE_WEATHER_SECRET_API_KEY;

const theQuery: Ref<string> = ref<string>('');
const theWeather: Ref<Record<string, any>> = ref({});

const setResults = (city: string, results: any) => {
  theWeather.value[city] = results;
};

const fetchWeather = async (city: string) => {
  const apiUrl = `${urlBase}weather?q=${city}&units=metric&APPID=${token}`;
  await fetchData(apiUrl);
  if (data.value) {
    setResults(city, data.value);
  }
};

const fetchWeatherForQuery = async () => {
  if (theQuery.value) {
    await fetchWeather(theQuery.value);
  }
};

const saveCurrentCity = () => {
  const cityName = theWeather.value[theQuery.value]?.name;
  if (cityName) {
    saveCity([...savedCities.value, cityName]);
  }
};

const removeCityFromStorage = (city: string) => {
  saveCity(savedCities.value.filter((savedCity: string) => savedCity !== city));
  delete theWeather.value[city];
};

// Загружаем данные о погоде для сохраненных городов при монтировании компонента
onMounted(() => {
  savedCities.value.forEach((city: string) => {
    fetchWeather(city);
  });
});

// Следим за изменениями в списке сохраненных городов и обновляем данные
watch(savedCities, (newCities) => {
  newCities.forEach((city: string) => {
    if (!theWeather.value[city]) {
      fetchWeather(city);
    }
  });
});

// Следим за изменениями в theQuery и вызываем fetchWeatherForQuery при изменении
watch(theQuery, (newQuery) => {
  if (newQuery) {
    fetchWeatherForQuery();
  }
});
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
              <TheButton @click="removeCityFromStorage(city)">Remove</TheButton>
            </div>
            <TheItemWeather v-if="theWeather[city]" :weather="theWeather[city]" :imgUrl="imgUrl" />
          </div>
        </li>
      </ul>
    </div>

    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error }}</p>
    <TheInput
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
