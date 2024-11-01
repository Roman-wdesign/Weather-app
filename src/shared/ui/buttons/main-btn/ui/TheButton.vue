<script setup lang="ts">
export interface Props {
  disabled?: boolean
  buttonClass?: string
}

const props = defineProps<Props>()
</script>
<template>
  <button
    class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm"
    :disabled="props.disabled"
    type="button"
  >
    <slot></slot>
  </button>
</template>
