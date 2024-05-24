<script setup lang="ts">

interface IWeather {
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

export interface Props {
    weather: IWeather;
    imgUrl: string;

}
const props = defineProps<Props>();

</script>

<template>
    <div>
        <div class="weather-wrap" v-if="props.weather.main">
            <div class="location-box">
                <div class="location">
                    <h3 class="text-lg font-bold text-center">{{ props.weather.name }}, {{ props.weather.sys.country }}
                    </h3>
                </div>
            </div>
        </div>
        <div class="weather-box py-3 flex-col justify-center" v-if="props.weather.main">
            <div class="temp flex justify-center py-3">
                <h2 class="text-2xl font-extrabold">{{ Math.round(props.weather.main.temp) }} °c</h2>
            </div>
            <div class="flex items-center justify-between weather">
                <div class="div flex">
                    <h4 class="font-bold">{{ props.weather.weather[0].main }}</h4>
                </div>
                <div class="div flex">
                    <img class="w-[150] h-auto" :src="`${imgUrl}${props.weather.weather[0].icon}@2x.png`" />
                </div>
            </div>
        </div>
    </div>
</template>
