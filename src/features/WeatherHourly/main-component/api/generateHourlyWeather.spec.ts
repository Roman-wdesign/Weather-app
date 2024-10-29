import { describe, it, expect } from 'vitest'
import { generateHourlyWeather } from '@/features/WeatherHourly/main-component/api'

describe('generateHourlyWeather', () => {
  it('should to create correct link', () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/'
    const lat = 51.5074
    const lon = -0.1278
    const token = 'your_api_token'

    const result = generateHourlyWeather(urlBase, lat, lon, token)

    expect(result).toBe(
      'https://api.openweathermap.org/data/2.5/forecast?lat=51.5074&lon=-0.1278&appid=your_api_token'
    )
  })

  it('should work correctly with negative latitude and longitude values', () => {
    const urlBase = 'https://api.weatherapi.com/v1/'
    const lat = -34.6037
    const lon = -58.3816
    const token = 'your_api_token'

    const result = generateHourlyWeather(urlBase, lat, lon, token)

    expect(result).toBe(
      'https://api.weatherapi.com/v1/forecast?lat=-34.6037&lon=-58.3816&appid=your_api_token'
    )
  })

  it('should work correctly with zero latitude and longitude values', () => {
    const urlBase = 'https://api.weather.com/v3/'
    const lat = 0
    const lon = 0
    const token = 'your_api_token'

    const result = generateHourlyWeather(urlBase, lat, lon, token)

    expect(result).toBe('https://api.weather.com/v3/forecast?lat=0&lon=0&appid=your_api_token')
  })
})
