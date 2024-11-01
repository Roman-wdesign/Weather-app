import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { WeatherNow } from '@/features/WeatherNow/main-component'

let fetchWeatherForQueryMock: any
let saveCurrentCityMock: any
let removeCityFromStorageMock: any
let handleDragStartMock: any
let handleDragOverMock: any
let handleDropMock: any

beforeEach(() => {
  fetchWeatherForQueryMock = vi.fn(() => Promise.resolve())
  saveCurrentCityMock = vi.fn()
  removeCityFromStorageMock = vi.fn()
  handleDragStartMock = vi.fn()
  handleDragOverMock = vi.fn()
  handleDropMock = vi.fn()
})

describe('WeatherNow Component', () => {
  it('should be truthly render data about weather and save city', async () => {
    const wrapper = mount(WeatherNow, {
      global: {
        components: { TheButton: true },
        mocks: {
          savedCities: [],
          theQuery: 'Test City',
          theWeather: { 'Test City': { temp: 25 } },
          error: null,
          loading: false,
          fetchWeatherForQuery: fetchWeatherForQueryMock,
          isSaveDisabled: false,
          saveCurrentCity: saveCurrentCityMock,
          removeCityFromStorage: removeCityFromStorageMock
        }
      }
    } as any)
    expect(wrapper.find('.query_weather').exists()).toBe(true)
  })

  it('should be to serve the error when data about weather is download', async () => {
    const wrapper = mount(WeatherNow, {
      global: {
        mocks: {
          savedCities: [],
          theQuery: 'Test City',
          theWeather: {},
          error: 'API Error',
          loading: false,
          fetchWeatherForQuery: fetchWeatherForQueryMock,
          isSaveDisabled: false
        }
      }
    } as any)

    await fetchWeatherForQueryMock()
    await nextTick()

    // Check error message render
    const errorMessage = wrapper.find('.error-message')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toContain('Error: API Error')
  })

  it('should be correct drag-and-drop', async () => {
    const wrapper = mount(WeatherNow, {
      global: {
        mocks: {
          savedCities: ['City 1'],
          theWeather: { 'City 1': { temp: 20 } },
          handleDragStart: handleDragStartMock,
          handleDragOver: handleDragOverMock,
          handleDrop: handleDropMock
        }
      }
    } as any)

    const draggableItem = wrapper.find('[draggable="true"]')

    //Check events dragstart, dragover, drop
    expect(draggableItem.exists()).toBe(true)
    await draggableItem.trigger('dragstart')
    await draggableItem.trigger('dragover')
    await draggableItem.trigger('drop')

    expect(handleDragStartMock).toHaveBeenCalled()
    expect(handleDragOverMock).toHaveBeenCalled()
    expect(handleDropMock).toHaveBeenCalled()
  })
})
