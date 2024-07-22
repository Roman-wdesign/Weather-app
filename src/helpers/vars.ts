export  const token: string = import.meta.env.VITE_WEATHER_SECRET_API_KEY


// url base 
export const genOpenWeatherURL= 'https://api.openweathermap.org/data/2.5/'
export  const urlBase: string = genOpenWeatherURL


// url to img
export const imgOpenWeatherURL= 'https://openweathermap.org/img/wn/'
export  const imgUrl: string = imgOpenWeatherURL

// url to geo
export const genReverseGeocodingUrl='http://api.openweathermap.org/geo/1.0/'
export const reverseGeo: string = genReverseGeocodingUrl
export const limit: number = 1