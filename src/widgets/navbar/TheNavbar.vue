<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useNavbar } from '@/shared/composables/localStorage/useNavbar'
import { useGeolocation } from '@/shared/composables/useGeolocation'

import { IconClose } from '@/shared/assets/image/svg/close'
import { BarsTree } from '@/shared/assets/image/svg/burger'
import { TheToggle } from '@/shared/ui/buttons/toggle'

const { showMenu, isDarkMode, toggleNav, toggleDarkMode } = useNavbar()
const { setGeolocationEnabled } = useGeolocation()

function handleGeolocationToggle(enabled: boolean) {
    setGeolocationEnabled(enabled)
}
const menuRef = ref<HTMLElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
    if (showMenu.value && menuRef.value && !menuRef.value.contains(e.target as Node)) {
        showMenu.value = false
    }
}

const handleMenuToggle = (e: MouseEvent) => {
    e.stopPropagation()
    toggleNav()
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div :class="isDarkMode ? 'dark' : ''">
        <div class="bg-indigo-600 dark:bg-gray-400 relative">
            <nav class="container px-4 mb-8 py-4 mx-auto md:flex md:justify-between md:items-center">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <button @click="toggleDarkMode"
                            class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400 mr-4">
                            <span v-if="isDarkMode" class="dark-mode-icon">🌙</span>
                            <span v-else class="light-mode-icon">☀️</span>
                        </button>
                    </div>
                    <!-- Mobile menu button -->
                    <div @click="handleMenuToggle" class="flex md:hidden">
                        <button type="button"
                            class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                            <BarsTree class="h-6 w-6 text-gray-50" :class="showMenu ? 'hidden' : 'flex'" />
                            <IconClose class="h-6 w-6 text-gray-50" :class="showMenu ? 'flex' : 'hidden'" />
                        </button>
                    </div>
                </div>
                <!-- Mobile Menu  -->
                <ul ref="menuRef" :class="{ 'flex': showMenu, 'hidden': !showMenu, 'md:flex': true }"
                    class="absolute top-full left-0 w-full  bg-indigo-600 dark:bg-gray-400 flex-col mt-4 space-y-4 md:static md:mt-0 md:flex md:flex-row md:items-center md:space-y-0 md:space-x-10">
                    <li>
                        <div>
                            <RouterLink to="/">
                                Home
                            </RouterLink>
                        </div>
                    </li>
                    <li>
                        <div>
                            <RouterLink to="/geolocation">
                                Geolocation
                            </RouterLink>
                        </div>
                    </li>
                    <li>
                        <div class="flex">
                            <p>Geolocation</p>&nbsp
                            <TheToggle @geolocation-toggle="handleGeolocationToggle" />
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>