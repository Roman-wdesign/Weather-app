import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useLocalStorage } from '@/shared/composables/localStorage/storage/model/useLocalStorage'

describe('useLocalStorage', () => {
  let key: string
  let initialValue: string
  let localStorageMock: any

  beforeEach(() => {
    key = 'testKey'
    initialValue = 'initialValue'

    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    }

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    })
  })

  it('should initialize with the value from localStorage if available', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('storedValue'))

    const { storedValue } = useLocalStorage(key, initialValue)

    expect(localStorageMock.getItem).toHaveBeenCalledWith(key)
    expect(storedValue.value).toBe('storedValue')
  })

  it('should initialize with the initialValue if localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null)

    const { storedValue } = useLocalStorage(key, initialValue)

    expect(storedValue.value).toBe(initialValue)
  })

  it('should set new value to localStorage', () => {
    const { storedValue, setValue } = useLocalStorage(key, initialValue)

    setValue('newValue')

    expect(storedValue.value).toBe('newValue')
    expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify('newValue'))
  })

  it('should remove the value from localStorage', () => {
    const { storedValue, removeValue } = useLocalStorage(key, initialValue)

    removeValue()

    expect(storedValue.value).toBe(initialValue)
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(key)
  })

  it('should handle invalid JSON in localStorage gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json')

    const { storedValue } = useLocalStorage(key, initialValue)
    expect(storedValue.value).toBe(initialValue)
  })
})
