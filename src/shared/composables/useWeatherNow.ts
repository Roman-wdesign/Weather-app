import { ref, computed, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import { useLocalStorage } from '@/shared/composables/localstorage/localStorage';
import { dateBuilder } from '@/helpers/DateBuilder';
import { useFetch } from '@/shared/composables/fetch';
import { genOpenWeatherURL, imgOpenWeatherURL } from '@/helpers/vars';


export function useWeatherNow(){
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

const fetchWeatherForQuery = computed ( async () => theQuery.value ? await fetchWeather(theQuery.value) : undefined);

const saveCurrentCity = () => {
    const cityName = theWeather.value[theQuery.value]?.name;
    if (cityName && !savedCities.value.includes(cityName)) {
        saveCity([...savedCities.value, cityName]);
         theQuery.value = ''
    }
};

const removeCityFromStorage = (city: string) => {
    saveCity(savedCities.value.filter((savedCity: string) => savedCity !== city));
    delete theWeather.value[city];
};

const isSaveDisabled = computed(() => savedCities.value.length >= 3);

// loading weather data when component mount, for saved cities in localStorage
onMounted(() => {
    savedCities.value.forEach((city: string) => {
        fetchWeather(city);
    });
});

// for changes in saved cities
watch(savedCities, (newCities) => {
    newCities.forEach((city: string) => {
        if (!theWeather.value[city]) {
            fetchWeather(city);
        }
    });
});
    return {
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
    };
}