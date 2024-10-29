import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { TheButton } from '@/shared/ui/buttons/main-btn'

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(TheButton, {
      slots: {
        default: 'Click Me'
      }
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Click Me')
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('renders with the disabled prop set to true', () => {
    const wrapper = mount(TheButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Click Me'
      }
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('renders slot content correctly', () => {
    const wrapper = mount(TheButton, {
      slots: {
        default: '<span>Click Me</span>'
      }
    })

    const button = wrapper.find('button')
    expect(button.html()).toContain('<span>Click Me</span>')
  })
})
