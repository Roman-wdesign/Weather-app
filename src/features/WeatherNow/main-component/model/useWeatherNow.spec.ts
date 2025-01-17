import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import type { Ref } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useWeatherNow } from '@/features/WeatherNow/main-component/model'
import * as cacheModule from '@/shared/composables/cache/model/useCache'
import * as urlModule from '@/features/WeatherNow/main-component/api/generateNowWeather'
import * as localStorageModule from '@/shared/composables/localStorage/saved-cities/model/useSavedCities'

describe('useWeatherNow composable', () => {
  let fetchWithCacheMock: ReturnType<typeof vi.fn>
  let generateWeatherUrlMock: ReturnType<typeof vi.fn>
  let saveCurrentCityMock: ReturnType<typeof vi.fn>
  let removeCityFromStorageMock: ReturnType<typeof vi.fn>
  let loadSavedCitiesMock: ReturnType<typeof vi.fn>
  let savedCitiesMock: Ref<string[]>

  beforeEach(() => {
    fetchWithCacheMock = vi.fn()
    generateWeatherUrlMock = vi.fn()
    saveCurrentCityMock = vi.fn()
    removeCityFromStorageMock = vi.fn()
    loadSavedCitiesMock = vi.fn()
    savedCitiesMock = ref([])

    vi.spyOn(cacheModule, 'fetchWithCache').mockImplementation(
      fetchWithCacheMock as unknown as (url: string) => Promise<any>
    )
    vi.spyOn(urlModule, 'generateWeatherUrl').mockImplementation(
      generateWeatherUrlMock as unknown as (urlBase: string, city: string, token: string) => string
    )

    vi.spyOn(localStorageModule, 'useSavedCities').mockReturnValue({
      savedCities: savedCitiesMock,
      saveCurrentCity: saveCurrentCityMock,
      removeCityFromStorage: removeCityFromStorageMock,
      loadSavedCities: loadSavedCitiesMock
    })
  })




  it('should disable save when savedCities limit reached', () => {
    savedCitiesMock.value = ['City1', 'City2', 'City3']

    const { isSaveDisabled } = useWeatherNow()
    expect(isSaveDisabled.value).toBe(true)
  })

  it('should call loadSavedCities on mount', () => {
    mount({
      setup() {
        useWeatherNow()
        return {}
      },
      template: '<div></div>'
    })
    expect(loadSavedCitiesMock).toHaveBeenCalled()
  })

  it('should allow saving a city if limit not reached', () => {
    savedCitiesMock.value = ['City1', 'City2']

    const { isSaveDisabled } = useWeatherNow()
    expect(isSaveDisabled.value).toBe(false)
  })

  it('should remove a city from storage', () => {
    const { removeCityFromStorage } = useWeatherNow()

    removeCityFromStorage('City1')
    expect(removeCityFromStorageMock).toHaveBeenCalledWith('City1')
  })
})
