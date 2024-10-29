import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref, onMounted } from 'vue'
import { useNavbar } from '@/widgets/navbar/model/useNavbar'
import { useLocalStorage } from '@/shared/composables/localStorage/storage/model/useLocalStorage'

vi.mock('@/shared/composables/localStorage/storage/model/useLocalStorage', () => {
  return {
    useLocalStorage: vi.fn().mockReturnValue({
      storedValue: ref(false),
      setValue: vi.fn()
    })
  }
})

describe('useNavbar', () => {
  let isDarkModeMock: any
  let setDarkModeMock: any

  beforeEach(() => {
    vi.spyOn(document.documentElement.classList, 'add')
    vi.spyOn(document.documentElement.classList, 'remove')

    const localStorageMock = useLocalStorage('theme', false)
    isDarkModeMock = localStorageMock.storedValue
    setDarkModeMock = localStorageMock.setValue

    vi.spyOn(localStorageMock, 'setValue')
  })

  it('should initialize with showMenu as false and isDarkMode from localStorage', () => {
    const { showMenu, isDarkMode } = useNavbar()

    expect(showMenu.value).toBe(false)
    expect(isDarkMode.value).toBe(false)
  })

  it('should toggle showMenu when toggleNav is called', () => {
    const { showMenu, toggleNav } = useNavbar()

    expect(showMenu.value).toBe(false)
    toggleNav()
    expect(showMenu.value).toBe(true)
    toggleNav()
    expect(showMenu.value).toBe(false)
  })

  it('should toggle dark mode and update document class on toggleDarkMode', () => {
    const { toggleDarkMode } = useNavbar()

    expect(isDarkModeMock.value).toBe(false)
    toggleDarkMode()
    expect(setDarkModeMock).toHaveBeenCalledWith(true)
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark')
    expect(document.documentElement.classList.remove).not.toHaveBeenCalled()
  })

  it('should apply correct class on mount based on isDarkMode value', () => {
    isDarkModeMock.value = false
    useNavbar()
    onMounted(() => {
      expect(document.documentElement.classList.add).not.toHaveBeenCalled()
      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark')
    })

    isDarkModeMock.value = true
    useNavbar()
    onMounted(() => {
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark')
      expect(document.documentElement.classList.remove).not.toHaveBeenCalled()
    })
  })
})
