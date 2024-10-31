<script setup lang="ts">
import { useWeatherNow } from '@/features/WeatherNow/main-component/model'

// Используем функцию из useWeatherNow для связи с погодным API
const { theQuery } = useWeatherNow()

// Выбор города
</script>

<template>
  <div class="autocomplete">
    <p class="autocomplete">autocomplete</p>
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
</style>
