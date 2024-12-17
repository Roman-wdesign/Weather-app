export const generateHourlyWeather = (
  urlBase: string,
  lat: number,
  lon: number,
  token: string
): string => `${urlBase}forecast?lat=${lat}&lon=${lon}&appid=${token}`
