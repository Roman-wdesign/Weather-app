import { routeName as main } from './routes/main'
import { routeName as hourly } from './routes/hourly'
import { routeName as notFound } from './routes/not-found'

export const pages = { main, hourly, notFound } as const
