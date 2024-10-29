<!-- <script setup lang="ts">
import { useWeatherNow } from '@/features/WeatherNow/main-component/model'

// Используем функцию из useWeatherNow для связи с погодным API
const { theQuery, fetchWeather, cities, fetchCities } = useWeatherNow()

// Выбор города
const selectCity = (city: any) => {
    theQuery.value = city.name
    fetchWeather(city.name) // Получаем погоду для выбранного города
    cities.value = [] // Очищаем список городов после выбора
}
</script>

<template>
    <div class="autocomplete">
        <input type="text" v-model="theQuery" @input="fetchCities" placeholder="Введите название города" />
        <ul v-if="cities.length > 0">
            <li v-for="city in cities.slice(0, 5)" :key="city.id" @click="selectCity(city)">
                {{ city.name }}, {{ city.country }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.autocomplete {
    width: 300px;
    position: relative;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

ul {
    position: absolute;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 4px;
    padding: 0;
    list-style: none;
}

li {
    padding: 8px;
    cursor: pointer;
}

li:hover {
    background-color: #f0f0f0;
}
</style> -->
