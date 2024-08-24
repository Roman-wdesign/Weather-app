import { watch } from 'vue'
import { useLocalStorage } from '@/shared/composables/localStorage/useLocalStorage'

export function useSavedCities(firstCityArg:any, secondCityArg:any) {
  const { storedValue: savedCities, setValue: saveCity } = useLocalStorage('savedCities', [])
  if (!Array.isArray(savedCities.value)) {
    savedCities.value = []
  }

  const saveCurrentCity = (city: string) => {
    if (city && !savedCities.value.includes(city)) {
      saveCity([...savedCities.value, city])
    }
  }

  const removeCityFromStorage = (city: string) => {
    saveCity(savedCities.value.filter((savedCity: string) => savedCity !== city))
    delete firstCityArg.value[city]
  }

  const loadSavedCities = () => {
    savedCities.value.forEach((city: string) => {
      secondCityArg(city)
    })
  }

  watch(savedCities, (newCities) => {
    newCities.forEach((city: string) => {
      if (!firstCityArg.value[city]) {
        secondCityArg(city)
      }
    })
  })

  return {
    savedCities,
    saveCurrentCity,
    removeCityFromStorage,
    loadSavedCities,
  }
}
