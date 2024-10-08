export interface IWeather {
    name: string
    sys: {
        country: string
    }
    main: {
        temp: number
        pressure: number
        humidity: number
    }
    weather: Array<{
        main: string
        icon: string
    }>    
}