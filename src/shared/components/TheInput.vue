<script setup lang="ts">
export interface Props {
    modelValue: string
    label: string
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
    <input :placeholder="props.label" type="text" :value="modelValue" @input="updateValue" />
</template>