import { describe, it, expect } from 'vitest'
import {
  generateGeocodingUrl,
  generatePolutionUrl,
  generateWeatherUrl
} from '@/features/WeatherNow/main-component/api'

describe('generateWeatherUrl', () => {
  it('должен корректно генерировать URL с правильными параметрами', () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/'
    const city = 'London'
    const token = 'your-api-token'

    const result = generateWeatherUrl(urlBase, city, token)

    expect(result).toBe(
      `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=your-api-token`
    )
  })

  it('должен корректно обрабатывать разные значения для города', () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/'
    const city = 'New York'
    const token = 'your-api-token'

    const result = generateWeatherUrl(urlBase, city, token)

    expect(result).toBe(
      `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&APPID=your-api-token`
    )
  })

  it('должен корректно генерировать URL с другим токеном', () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/'
    const city = 'Tokyo'
    const token = 'another-api-token'

    const result = generateWeatherUrl(urlBase, city, token)

    expect(result).toBe(
      `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&APPID=another-api-token`
    )
  })

  it('should generate Air Pollution API url', () => {
    const urlBase = 'http://api.openweathermap.org/data/2.5/'
    const lat = 50
    const lon = 50
    const token = 'another-api-token'

    const result = generatePolutionUrl(urlBase, lat, lon, token)

    expect(result).toBe(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=another-api-token`
    )
  })

  it('should generate Air Pollution API url', () => {
    const urlBase = 'http://api.openweathermap.org/data/2.5/'
    const lat = 1.6
    const lon = 5.46
    const token = 'another-api-token'

    const result = generatePolutionUrl(urlBase, lat, lon, token)

    expect(result).toBe(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=1.6&lon=5.46&appid=another-api-token`
    )
  })

  it('should generate Geocoding API url', () => {
    const urlBase = 'http://api.openweathermap.org/geo/1.0/'
    const city = 'Tokyo'
    const token = 'another-api-token'

    const result = generateGeocodingUrl(urlBase, city, token)

    expect(result).toBe(
      `http://api.openweathermap.org/geo/1.0/direct?q=Tokyo&limit=1&appid=another-api-token`
    )
  })

  it('should generate Geocoding API url', () => {
    const urlBase = 'http://api.openweathermap.org/geo/1.0/'
    const city = 'New York'
    const token = 'another-api-token'

    const result = generateGeocodingUrl(urlBase, city, token)

    expect(result).toBe(
      `http://api.openweathermap.org/geo/1.0/direct?q=New York&limit=1&appid=another-api-token`
    )
  })
})
