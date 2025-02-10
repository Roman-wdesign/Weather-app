import {
  IconBrokenCloudsDay,
  IconClearSkyDay,
  IconFewCloudsDay,
  IconScatteredCloudsDay,
  IconShowerRainDay,
  IconThunderstormDay,
  IconRainDay,
  IconSnowDay,
  IconMistDay
} from '@/shared/assets/image/svg/condtitions/day'

import {
  IconBrokenCloudsNight,
  IconClearSkyNight,
  IconFewCloudsNight,
  IconScatteredCloudsNight,
  IconShowerRainNight,
  IconThunderstormNight,
  IconRainNight,
  IconSnowNight,
  IconMistNight
} from '@/shared/assets/image/svg/condtitions/night'

export const weatherIcons = new Map<string, any>([
  ['01d', IconClearSkyDay],
  ['01n', IconClearSkyNight],
  ['02d', IconFewCloudsDay],
  ['02n', IconFewCloudsNight],
  ['03d', IconScatteredCloudsDay],
  ['03n', IconScatteredCloudsNight],
  ['04d', IconBrokenCloudsDay],
  ['04n', IconBrokenCloudsNight],
  ['09d', IconShowerRainDay],
  ['09n', IconShowerRainNight],
  ['10d', IconRainDay],
  ['10n', IconRainNight],
  ['11d', IconThunderstormDay],
  ['11n', IconThunderstormNight],
  ['13d', IconSnowDay],
  ['13n', IconSnowNight],
  ['50d', IconMistDay],
  ['50n', IconMistNight]
])
