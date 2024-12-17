import { describe, it, expect, beforeEach, vi, type MockedFunction } from 'vitest'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { useSavedCities } from '@/shared/composables/localStorage/saved-cities/model/useSavedCities'
import { useLocalStorage } from '@/shared/composables/localStorage/storage/model/useLocalStorage'

vi.mock('@/shared/composables/localStorage/storage/model/useLocalStorage', () => ({
  useLocalStorage: vi.fn()
}))

describe('useSavedCities', () => {
  let firstCityArg: Ref<Record<string, any>>
  let secondCityArg: MockedFunction<(city: string) => void>
  let thirdCityArg: MockedFunction<(city: string) => void>
  let mockUseLocalStorage: {
    storedValue: Ref<string[]>
    setValue: MockedFunction<(value: string[]) => void>
  }

  beforeEach(() => {
    firstCityArg = ref<Record<string, any>>({})
    secondCityArg = vi.fn()
    thirdCityArg = vi.fn()

    mockUseLocalStorage = {
      storedValue: ref<string[]>([]),
      setValue: vi.fn()
    }
    ;(useLocalStorage as any).mockReturnValue(mockUseLocalStorage)
  })

  it('should initialize savedCities as an empty array if not present in localStorage', () => {
    useSavedCities(firstCityArg, secondCityArg, thirdCityArg)
    expect(mockUseLocalStorage.storedValue.value).toEqual([])
  })

  it('should save a city if it is not already in the savedCities array', () => {
    const { saveCurrentCity } = useSavedCities(firstCityArg, secondCityArg, thirdCityArg)

    mockUseLocalStorage.setValue.mockImplementation((newCities: string[]) => {
      mockUseLocalStorage.storedValue.value = newCities
    })

    saveCurrentCity('New York')

    expect(mockUseLocalStorage.setValue).toHaveBeenCalledWith(['New York'])
    expect(mockUseLocalStorage.storedValue.value).toContain('New York')
  })

  it('should not save a city if it is already in the savedCities array', () => {
    mockUseLocalStorage.storedValue.value = ['New York']
    const { saveCurrentCity } = useSavedCities(firstCityArg, secondCityArg, thirdCityArg)
    saveCurrentCity('New York')

    expect(mockUseLocalStorage.setValue).not.toHaveBeenCalled()
  })

  it('should remove a city from savedCities and from firstCityArg', () => {
    mockUseLocalStorage.storedValue.value = ['New York', 'Los Angeles']
    firstCityArg.value = { 'New York': {}, 'Los Angeles': {} }

    const { removeCityFromStorage } = useSavedCities(firstCityArg, secondCityArg, thirdCityArg)
    removeCityFromStorage('New York')

    expect(mockUseLocalStorage.setValue).toHaveBeenCalledWith(['Los Angeles'])
    expect(firstCityArg.value).not.toHaveProperty('New York')
  })

  it('should load saved cities into firstCityArg when loadSavedCities is called', () => {
    mockUseLocalStorage.storedValue.value = ['New York', 'Los Angeles']

    const { loadSavedCities } = useSavedCities(firstCityArg, secondCityArg, thirdCityArg)
    loadSavedCities()

    expect(secondCityArg).toHaveBeenCalledWith('New York')
    expect(secondCityArg).toHaveBeenCalledWith('Los Angeles')

    expect(thirdCityArg).toHaveBeenCalledWith('New York')
    expect(thirdCityArg).toHaveBeenCalledWith('Los Angeles')
  })

  it('should call secondCityArg when a new city is added via savedCities watch', async () => {
    const { savedCities } = useSavedCities(firstCityArg, secondCityArg, thirdCityArg)
    mockUseLocalStorage.storedValue.value = []

    savedCities.value = ['San Francisco']

    await flushPromises()

    expect(secondCityArg).toHaveBeenCalledWith('San Francisco')

    expect(thirdCityArg).toHaveBeenCalledWith('San Francisco')
  })
})
