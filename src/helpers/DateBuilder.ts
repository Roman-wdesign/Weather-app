export const dateBuilder = () => {
    const d:Date = new Date();
    const months:string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days :string[]= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    const day:string = days[d.getDay()];
    const date:number = d.getDate();
    const month:string = months[d.getMonth()];
    const year:number = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }

  