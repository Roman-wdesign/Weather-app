<script setup lang="ts">
import { ref } from 'vue'
import TheInput from '@/shared/components/TheInput.vue';
const thirdMessageInput = ref('')
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex justify-center">
      <h5>The Welcome</h5>
      <TheInput label="введите число" v-model="thirdMessageInput"><template #header>Сметана 20%</template>
      </TheInput>
    </div>
  </div>
</template>
