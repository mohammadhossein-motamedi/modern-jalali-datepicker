import Jalali from "./Jalali";

export default class Calendar {

    constructor() {
        this.jalali = new Jalali();    
    }

    getMonth(year, month) 
    {

        const total = this.jalali.getMonthLength(year, month);
        const days = [];

      
        const firstDay = this.jalali.getFirstWeekDay(year, month);;

        // daies   
        for (let i = 0; i < firstDay; i++) {
            days.push({
                day: null,
                current: false
            });
        }

        
        for (let i = 1; i <= total; i++) {

            days.push({
                day: i,
                month: month,
                year: year,
                current: true,
                weekDay: this.getWeekDay(year, month, i)
            });

        }

        // Filling up to 42 cells
        while (days.length < 42) {

            days.push({
                day: null,
                current: false
            });

        }

        return days;

    }

    // get today date
    today() 
    {

        return this.jalali.today();

    }

    // compare two date
    compareDates(a, b) 
    {

        if (a.year !== b.year) {
            return a.year - b.year;
        }

        if (a.month !== b.month) {
            return a.month - b.month;
        }

        return a.day - b.day;

    }
    isSameDate(a, b) 
    {

        return (
            a.year === b.year &&
            a.month === b.month &&
            a.day === b.day
        );

    }

    // get weekday
    getWeekDay(year, month, day) 
    {

        return this.jalali.getWeekDay(year, month, day);

    }


    // Getting the time based on Iran's time zone
    getIranTime() 
    {

        const now = new Date();

        const formatter = new Intl.DateTimeFormat("en-US", 
        {
            timeZone: "Asia/Tehran",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

        const parts = formatter.formatToParts(now);

        return {
            hour: Number(parts.find(p => p.type === "hour").value),
            minute: Number(parts.find(p => p.type === "minute").value),
            second: Number(parts.find(p => p.type === "second").value)
        };

    }
}