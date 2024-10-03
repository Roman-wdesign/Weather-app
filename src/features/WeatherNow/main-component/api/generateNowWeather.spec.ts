import { describe, it, expect } from 'vitest'
import { generateWeatherUrl } from '@/features/WeatherNow/main-component/api'

describe('generateWeatherUrl', () => {
    it('должен корректно генерировать URL с правильными параметрами', () => {
        const urlBase = 'https://api.openweathermap.org/data/2.5/'
        const city = 'London'
        const token = 'your-api-token'

        const result = generateWeatherUrl(urlBase, city, token)

        expect(result).toBe(`https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=your-api-token`)
    })

    it('должен корректно обрабатывать разные значения для города', () => {
        const urlBase = 'https://api.openweathermap.org/data/2.5/'
        const city = 'New York'
        const token = 'your-api-token'

        const result = generateWeatherUrl(urlBase, city, token)

        expect(result).toBe(`https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&APPID=your-api-token`)
    })

    it('должен корректно генерировать URL с другим токеном', () => {
        const urlBase = 'https://api.openweathermap.org/data/2.5/'
        const city = 'Tokyo'
        const token = 'another-api-token'

        const result = generateWeatherUrl(urlBase, city, token)

        expect(result).toBe(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&APPID=another-api-token`)
    })
})
