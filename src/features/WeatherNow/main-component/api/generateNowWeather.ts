export const generateWeatherUrl = (urlBase: string, city: string, token: string): string =>
  `${urlBase}weather?q=${city}&units=metric&APPID=${token}`

export const generatePolutionUrl = (
  urlBase: string,
  lat: number,
  lon: number,
  token: string
): string => `${urlBase}air_pollution?lat=${lat}&lon=${lon}&appid=${token}`

export const generateGeocodingUrl = (urlBase: string, city: string, token: string): string =>
  `${urlBase}direct?q=${city}&limit=1&appid=${token}`
