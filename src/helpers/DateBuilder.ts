import type { IdateBuilder } from "@/shared/models/IdateBuilder";
export const dateBuilder = (): string => {
    const d = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    const dayOfWeek: string = days[d.getDay()];
    const dayOfMonth: number = d.getDate();
    const monthName: string = months[d.getMonth()];

    const dateObj: IdateBuilder<string, number> = {
        dayOfWeek,
        dayOfMonth,
        monthName
    };

    return `${dateObj.dayOfWeek}, ${dateObj.dayOfMonth} ${dateObj.monthName}`;
}