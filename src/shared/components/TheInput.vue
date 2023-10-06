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
    <div class="mr-4">
        <slot name="header"></slot>
    </div>
    <input class="input border-2 border-amber-800" :placeholder="props.label" type="input" :value="modelValue"
        @input="updateValue" />
</template>