import {
  IconNorth,
  IconNorthEast,
  IconEast,
  IconSouthEast,
  IconSouth,
  IconSouthWest,
  IconWest,
  IconNorthWest
} from '@/shared/assets/image/svg/wind-directions'

export function getWindDirection(angle: number): { name: string; icon: any } {
  const directions = [
    { name: 'N', icon: IconNorth },
    { name: 'NE', icon: IconNorthEast },
    { name: 'E', icon: IconEast },
    { name: 'SE', icon: IconSouthEast },
    { name: 'S', icon: IconSouth },
    { name: 'SW', icon: IconSouthWest },
    { name: 'W', icon: IconWest },
    { name: 'NW', icon: IconNorthWest }
  ]
  return directions[Math.round(angle / 45) % 8]
}
