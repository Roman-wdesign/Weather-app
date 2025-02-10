// Define a type for the days of the week
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

// Define a type for the months of the year
type MonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

// Interface representing a structured date object
export interface IdateBuilder {
  dayOfWeek: DayOfWeek
  dayOfMonth: number
  monthName: MonthName
}
