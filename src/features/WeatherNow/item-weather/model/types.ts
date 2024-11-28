export interface IWeather {
  name: string
  sys: {
    country: string
  }
  main: {
    temp: number
  }
  weather: Array<{
    main: string
    icon: string
  }>
  wind: {
    speed: number
    gust: number
    deg: number
}
}
