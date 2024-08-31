import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TheNavbar from '@/shared/components/TheNavbar.vue'

vi.mock('@/shared/composables/localStorage/useNavbar', () => ({
    useNavbar: () => ({
        showMenu: false,
        isDarkMode: false,
        toggleNav: vi.fn(),
        toggleDarkMode: vi.fn(),
    })
}))

vi.mock('@/shared/composables/useGeolocation', () => ({
    useGeolocation: () => ({
        setGeolocationEnabled: vi.fn(),
    })
}))

describe('Navbar Component', () => {
    it('renders correctly', () => {
        const wrapper = mount(TheNavbar)
        expect(wrapper.exists()).toBe(true)
    })


})
