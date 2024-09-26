import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { TheInput } from '@/shared/ui/inputs'

describe('TheInput Component', () => {
    it('renders correctly with props', () => {
        const wrapper = mount(TheInput, {
            props: {
                modelValue: 'Initial value',
                label: 'Enter text',
            },
        })

        const input = wrapper.find('input')
        expect(input.exists()).toBe(true)
        expect(input.attributes('placeholder')).toBe('Enter text')
        expect(input.element.value).toBe('Initial value')
    })

    it('emits update:modelValue event with correct value when input changes', async () => {
        const wrapper = mount(TheInput, {
            props: {
                modelValue: 'Initial value',
                label: 'Enter text',
            },
        })

        const input = wrapper.find('input')
        await input.setValue('New value')

        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['New value'])
    })
})
