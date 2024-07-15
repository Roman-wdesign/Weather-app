// useSavedCities.ts
import { ref, watch } from 'vue';
import { useLocalStorage } from '@/shared/composables/localstorage/useLocalStorage';

export function useSavedCities(theWeather:any, fetchWeather:any) {
  const { storedValue: savedCities, setValue: saveCity } = useLocalStorage('savedCities', []);
  if (!Array.isArray(savedCities.value)) {
    savedCities.value = [];
  }

  const saveCurrentCity = (city: string) => {
    if (city && !savedCities.value.includes(city)) {
      saveCity([...savedCities.value, city]);
    }
  };

  const removeCityFromStorage = (city: string) => {
    saveCity(savedCities.value.filter((savedCity: string) => savedCity !== city));
    delete theWeather.value[city];
  };

  const loadSavedCities = () => {
    savedCities.value.forEach((city: string) => {
      fetchWeather(city);
    });
  };

  watch(savedCities, (newCities) => {
    newCities.forEach((city: string) => {
      if (!theWeather.value[city]) {
        fetchWeather(city);
      }
    });
  });

  return {
    savedCities,
    saveCurrentCity,
    removeCityFromStorage,
    loadSavedCities,
  };
}
