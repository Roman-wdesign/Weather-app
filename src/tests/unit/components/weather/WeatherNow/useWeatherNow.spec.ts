import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import type { Ref } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useWeatherNow } from '@/features/WeatherNow/model/useWeatherNow'
import * as cacheModule from '@/shared/composables/cache/useCache'
import * as urlModule from '@/shared/api/helpers/generate-now/api/generateNowWeather'
import * as localStorageModule from '@/shared/composables/localStorage/useSavedCities'

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


        vi.spyOn(cacheModule, 'fetchWithCache').mockImplementation(fetchWithCacheMock as unknown as (url: string) => Promise<any>)
        vi.spyOn(urlModule, 'generateWeatherUrl').mockImplementation(generateWeatherUrlMock as unknown as (urlBase: string, city: string, token: string) => string)

        vi.spyOn(localStorageModule, 'useSavedCities').mockReturnValue({
            savedCities: savedCitiesMock,
            saveCurrentCity: saveCurrentCityMock,
            removeCityFromStorage: removeCityFromStorageMock,
            loadSavedCities: loadSavedCitiesMock,
        })
    })

    it('should fetch weather data successfully', async () => {
        const { theWeather, error, loading, fetchWeatherForQuery, theQuery } = useWeatherNow()

        generateWeatherUrlMock.mockReturnValue('http://example.com/weather')
        fetchWithCacheMock.mockResolvedValueOnce({ temp: 25 })

        theQuery.value = 'Test City'
        await fetchWeatherForQuery.value

        expect(loading.value).toBe(false)
        expect(error.value).toBeNull()
        expect(theWeather.value['Test City']).toEqual({ temp: 25 })
    })

    it('should handle fetch weather error', async () => {
        const { theWeather, error, loading, fetchWeatherForQuery, theQuery } = useWeatherNow()

        generateWeatherUrlMock.mockReturnValue('http://example.com/weather')
        fetchWithCacheMock.mockRejectedValueOnce(new Error('API Error'))

        theQuery.value = 'Test City'
        await fetchWeatherForQuery.value

        expect(loading.value).toBe(false)
        expect(error.value).toBe('API Error')
        expect(theWeather.value['Test City']).toBeUndefined()
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
            template: '<div></div>',
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
