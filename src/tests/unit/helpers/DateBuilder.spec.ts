import { describe, it, expect, vi, afterEach } from 'vitest'
import { dateBuilder } from '@/helpers/DateBuilder'

describe('dateBuilder', () => {
    it('должен возвращать корректную строку даты для текущей даты', () => {

        const fixedDate = new Date(2023, 2, 3) // Months in JavaScript strating since 0, because 2 is March
        vi.setSystemTime(fixedDate)

        const result = dateBuilder()

        expect(result).toBe('Friday, 3 March')
    })

    it('должен возвращать корректную строку даты для другой фиксированной даты', () => {
        //  1 January 2024 года, Monday
        const fixedDate = new Date(2024, 0, 1) // January
        vi.setSystemTime(fixedDate)

        const result = dateBuilder()

        expect(result).toBe('Monday, 1 January')
    })

    it('должен корректно обрабатывать дни недели и месяцы', () => {

        const dates = [
            { date: new Date(2024, 5, 14), expected: 'Friday, 14 June' },
            { date: new Date(2022, 10, 30), expected: 'Wednesday, 30 November' },
            { date: new Date(2025, 7, 9), expected: 'Saturday, 9 August' },
        ]

        dates.forEach(({ date, expected }) => {
            vi.setSystemTime(date)
            const result = dateBuilder()
            expect(result).toBe(expected)
        })
    })

    afterEach(() => {
        vi.useRealTimers() //Restore real time after each test
    })
})