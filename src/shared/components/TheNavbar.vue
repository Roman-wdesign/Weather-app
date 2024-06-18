<script setup lang="ts">
import { useNavbar } from '@/shared/composables/localstorage/useNavbar'
import IconClose from '@/shared/components/icons/IconClose.vue'
import BarsTree from '@/shared/components/icons/BarsTree.vue'
import TheToggle from '@/shared/components/TheToggle.vue'
const { showMenu, isDarkMode, toggleNav, toggleDarkMode } = useNavbar();
</script>

<template>
    <div class="bg-indigo-600 dark:bg-gray-800">
        <nav class="container px-6 mb-8 py-8 mx-auto md:flex md:justify-between md:items-center">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <button @click="toggleDarkMode"
                        class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400 mr-4">
                        <span v-if="isDarkMode" class="dark-mode-icon">🌙</span>

                        <span v-else class="light-mode-icon">☀️</span>
                        <div>
                            <TheToggle></TheToggle>
                        </div>
                    </button>

                </div>
                <!-- Mobile menu button -->
                <div @click="toggleNav" class="flex md:hidden">
                    <button type="button"
                        class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                        <BarsTree class="h-6 w-6 text-gray-50" :class="showMenu ? 'hidden' : 'flex'" />
                        <IconClose class="h-6 w-6 text-gray-50" :class="showMenu ? 'flex' : 'hidden'" />
                    </button>
                </div>
            </div>

            <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
            <ul :class="showMenu ? 'flex' : 'hidden'"
                class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">
                <li>Activate Geolocation
                    <!-- <RouterLink @click="showMenu = false" class="text-blue-600 visited:text-slate-100" to="/"
                        active-class="bg-sky-600">
                        Home
                    </RouterLink> -->
                </li>
                <li>
                    B
                </li>
                <li>
                    C
                </li>
                <li>
                    D
                </li>
            </ul>
        </nav>
    </div>
</template>
