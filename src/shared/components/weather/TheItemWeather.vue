<script setup lang="ts">
import TheButton from '@/shared/components/TheButton.vue';

interface Weather {
    name: string;
    sys: {
        country: string;
    };
    main: {
        temp: number;
    };
    weather: Array<{
        main: string;
        icon: string;
    }>;
}

const props = defineProps<{
    weather: Weather;
    imgUrl: string;
    savedCities: string[];
}>();

const emit = defineEmits<{
    (e: 'remove-city', city: string): void;
}>();

const removeCity = (city: string) => {
    emit('remove-city', city);
}
</script>

<template>
    <div>
        <div class="weather-wrap" v-if="weather.main">
            <div class="location-box">
                <div class="location">
                    <h3 class="text-lg font-bold text-center">{{ weather.name }}, {{ weather.sys.country }}</h3>
                </div>
            </div>
        </div>
        <div class="weather-box py-3 flex-col justify-center" v-if="weather.main">
            <div class="temp flex justify-center py-3">
                <h2 class="text-2xl font-extrabold">{{ Math.round(weather.main.temp) }} °c</h2>
            </div>
            <div class="flex items-center justify-between weather">
                <div class="div flex">
                    <h4 class="font-bold">{{ weather.weather[0].main }}</h4>
                </div>
                <div class="div flex">
                    <img class="w-[150] h-auto" :src="`${imgUrl}${weather.weather[0].icon}@2x.png`" />
                </div>
            </div>
        </div>

        <div class="saved-cities">
            <h3>Saved Cities</h3>
            <ul>
                <li v-for="city in props.savedCities" :key="city">
                    {{ city }}
                    <TheButton @click="removeCity(city)">Remove</TheButton>
                </li>
            </ul>
        </div>
    </div>
</template>
