import type { TemperatureRange } from '../temperature/types'

export const temperatureRanges: TemperatureRange[] = [
  { min: -Infinity, max: -60, color: 'text-fuchsia-900' }, // yakut winter
  { min: -60, max: -50, color: 'text-purple-800' }, // arctic winter
  { min: -50, max: -40, color: 'text-violet-600' }, // siberian winter
  { min: -40, max: -30, color: 'text-violet-500' }, // ural winter
  { min: -30, max: -20, color: 'text-indigo-400' }, // asian winter
  { min: -20, max: -10, color: 'text-sky-600' }, // europian winter
  { min: -10, max: -5, color: 'text-cyan-500' },
  { min: -5, max: 0, color: 'text-cyan-300' },
  { min: 0, max: 5, color: 'text-zinc-900 dark:text-zinc-500' }, // 0
  { min: 5, max: 10, color: 'text-emerald-400' }, // arctic spring
  { min: 10, max: 15, color: 'text-lime-400' }, //  siberian spring
  { min: 15, max: 20, color: 'text-yellow-400' }, // europian spring
  { min: 20, max: 30, color: 'text-amber-300' },
  { min: 30, max: 35, color: 'text-orange-600' }, // miami summer
  { min: 35, max: 40, color: 'text-pink-600' }, // turkmenistan summer
  { min: 40, max: Infinity, color: 'text-rose-600' } // quatar summer
]
