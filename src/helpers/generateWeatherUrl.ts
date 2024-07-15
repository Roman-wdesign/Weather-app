export const generateWeatherUrl=(urlBase:string,city:string,token:string)=>{
    return `${urlBase}weather?q=${city}&units=metric&APPID=${token}`
}