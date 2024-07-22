export const generateHourlyWeather = (urlBase:string, lat: number, lon: number,  token: string): string => {
  return `${urlBase}forecast?lat=${lat}&lon=${lon}&appid=${token}`
}