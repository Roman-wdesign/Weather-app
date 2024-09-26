<script setup lang="ts">
import { watch } from 'vue'
import { useLocalStorage } from '@/shared/composables/localStorage/storage'

const { storedValue: isGeolocationEnabled, setValue: setGeolocationEnabled } = useLocalStorage('geolocationEnabled', false)

watch(isGeolocationEnabled, (newValue) => {
    setGeolocationEnabled(newValue)
    const event = new CustomEvent('geolocation-toggle', { detail: newValue })
    window.dispatchEvent(event)
})
</script>

<template>
    <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="isGeolocationEnabled" value="" class="sr-only peer">
        <div
            class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500">
        </div>
    </label>
</template>
