import * as jalaali from "jalaali-js";

export default class Jalali {

    
    getMonthLength(year, month) {
        return jalaali.jalaaliMonthLength(year, month + 1);
    }

    isLeap(year) {
        return jalaali.isLeapJalaaliYear(year);
    }

    getFirstWeekDay(year, month) {

        const g = jalaali.toGregorian(year, month + 1, 1);

        const date = new Date(g.gy, g.gm - 1, g.gd);

        let day = date.getDay();

        
        return (day + 1) % 7;

    }

    today() 
    {

        const now = new Date();

        const j = jalaali.toJalaali(
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate()
        );

        return {

            year: j.jy,
            month: j.jm - 1,
            day: j.jd

        };

    }

    getWeekDay(year, month, day) 
    {

        const g = jalaali.toGregorian(year, month + 1, day);

        const date = new Date(g.gy, g.gm - 1, g.gd);

        return (date.getDay() + 1) % 7;

    }

    
}