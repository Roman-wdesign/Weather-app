import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { TheItemWeather } from '@/features/WeatherNow/item-weather/ui'
import type { IWeather } from '@/features/WeatherNow/item-weather/model'
describe('TheItemWeather.vue', () => {
  const weather: IWeather = {
    name: 'Test City',
    sys: {
      country: 'TC'
    },
    main: {
      temp: 22,
      pressure: 1013,
      humidity: 80
    },
    weather: [
      {
        main: 'Clear',
        icon: '01d'
      }
    ],
    wind:
      {
        speed: 5,
        gust: 8,
        deg: 120,
      },
  }

  const imgUrl = 'http://example.com/img/'

  it('should render name of country and city', () => {
    const wrapper = mount(TheItemWeather, {
      props: {
        weather,
        imgUrl
      }
    })

    expect(wrapper.text()).toContain('Test City')
    expect(wrapper.text()).toContain('TC')
  })

  it('should render temperature', () => {
    const wrapper = mount(TheItemWeather, {
      props: {
        weather,
        imgUrl
      }
    })

    expect(wrapper.text()).toContain('22 °c')
  })

  it('should render description of the weather', () => {
    const wrapper = mount(TheItemWeather, {
      props: {
        weather,
        imgUrl
      }
    })

    expect(wrapper.text()).toContain('Clear')
  })

  it('should render the icon of the weather', () => {
    const wrapper = mount(TheItemWeather, {
      props: {
        weather,
        imgUrl
      }
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(`${imgUrl}01d@2x.png`)
  })

  it('should render has div, if the data about the weather is no empty', () => {
    const wrapper = mount(TheItemWeather, {
      props: {
        weather,
        imgUrl
      }
    })
    expect(wrapper.find('.weather-wrap').exists()).toBe(true)
  })

  it('should render atmospheric pressure', () => {
    const wrapper = mount(TheItemWeather, {
      props: {
        weather,
        imgUrl
      }
    })
    expect(wrapper.text()).toContain('1013 hPa')
  })
  
  it('should render humidity', () => {
    const wrapper = mount(TheItemWeather, {
      props: {
        weather,
        imgUrl
      }
    })
    expect(wrapper.text()).toContain('80 %')
  })
})
