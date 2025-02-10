import type { IdateBuilder } from '@/shared/api/helpers/date-builder/model'

export const dateBuilder = (): string => {
  const d = new Date() // Get the current date

  // Array of months with literal values (readonly)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ] as const

  // Array of weekdays with literal values (readonly)
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ] as const

  // Get the day of the week, day of the month, and month name with correct typing
  const dayOfWeek = days[d.getDay()]
  const dayOfMonth = d.getDate()
  const monthName = months[d.getMonth()]

  // Create a date object that cannot be modified (Readonly)
  const dateObj: Readonly<IdateBuilder> = {
    dayOfWeek,
    dayOfMonth,
    monthName
  }
  return `${dateObj.dayOfWeek}, ${dateObj.dayOfMonth} ${dateObj.monthName}`
}
