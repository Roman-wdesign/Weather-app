// useWeatherNow.ts
import { ref, computed, onMounted } from 'vue';

import { useFetch } from '@/shared/composables/useFetch';
import { genOpenWeatherURL, imgOpenWeatherURL } from '@/helpers/vars';
import { generateWeatherUrl } from '@/helpers/generateWeatherUrl';
import { useSavedCities } from '@/shared/composables/localstorage/useSavedCities';

export function useWeatherNow() {
  const { data, error, loading, fetchData } = useFetch();

  const urlBase: string = genOpenWeatherURL;
  const imgUrl: string = imgOpenWeatherURL;
  const token: string = import.meta.env.VITE_WEATHER_SECRET_API_KEY;

  const theQuery = ref<string>('');
  const theWeather = ref<Record<string, any>>({});

  const setResults = (city: string, results: any) => {
    theWeather.value[city] = results;
  };

  const fetchWeather = async (city: string) => {
    const apiUrl = generateWeatherUrl(urlBase, city, token);
    await fetchData(apiUrl);
    if (data.value) {
      setResults(city, data.value);
    }
  };

  // if theQuery is no empty - get data, or undefined
  const fetchWeatherForQuery = computed(async () => (theQuery.value ? await fetchWeather(theQuery.value) : undefined));

  const { savedCities, saveCurrentCity, removeCityFromStorage, loadSavedCities } = useSavedCities(theWeather, fetchWeather);

  const isSaveDisabled = computed(() => savedCities.value.length >= 3);

  onMounted(() => {
    loadSavedCities();
  });

  return {
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
  };
}
