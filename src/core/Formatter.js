export default class Formatter {

    constructor(format = "YYYY/MM/DD") {

        if (!this.isValidFormat(format)) 
        {

            console.warn(
                `[PersianDatePicker] Invalid format "${format}", using default format.`
            );

            format = "YYYY/MM/DD";
        }

        this.format = format;
    }

    formatDate(date ,state = {}) 
    {     
        const isMultiple = (state.multiple ?? 0) > 0;
        if (!date) return "";
        
        const hour24 = date.hour ?? 0;
        const minute = date.minute ?? 0;
        const second = date.second ?? 0;
        
        
        const meridiem =  state.meridiem ??  "AM";

        let hour12 = hour24 % 12;
        if (hour12 === 0) hour12 = 12;

        const values = {

            YYYY: String(date.year),
            YY: String(date.year).slice(-2),

            MM: String(date.month + 1).padStart(2, "0"),
            M: String(date.month + 1),

            DD: String(date.day).padStart(2, "0"),
            D: String(date.day),

            HH: String(hour24).padStart(2, "0"),
            H: String(hour24),

            hh: String(hour12).padStart(2, "0"),
            h: String(hour12),

            mm: String(minute).padStart(2, "0"),
            m: String(minute),

            ss: String(second).padStart(2, "0"),
            s: String(second),

            A: meridiem,
            a: meridiem.toLowerCase()

        };

        let result = this.format;
       
        if (isMultiple || state.isRange) 
        {
            result = result
                .replace(/\s*(HH|H|hh|h):?(mm|m)?(?::?(ss|s)?)?\s*(A|a)?/g, "")
                .trim();
        }
        
        Object.keys(values)
            .sort((a, b) => b.length - a.length)
            .forEach(token => {

                result = result.replaceAll(token, values[token]);
                
            });

       
        
        return result;
        
    }

    parseDate(value) 
    {
         if (typeof value !== "string") return null;

    const tokenPatterns = {
        YYYY: "(\\d{4})",
        YY: "(\\d{2})",
        MM: "(\\d{2})",
        M: "(\\d{1,2})",
        DD: "(\\d{2})",
        D: "(\\d{1,2})",
        HH: "(\\d{2})",
        H: "(\\d{1,2})",
        hh: "(\\d{2})",
        h: "(\\d{1,2})",
        mm: "(\\d{2})",
        m: "(\\d{1,2})",
        ss: "(\\d{2})",
        s: "(\\d{1,2})",
        A: "(AM|PM)",
        a: "(am|pm)"
    };

    const tokens = [];

    const regexString = "^" + this.format.replace(
        /YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|A|a/g,
        token => {
            tokens.push(token);
            return tokenPatterns[token];
        }
    ) + "$";

 const match = value.match(new RegExp(regexString));

    if (!match) return null;

    const result = {};

    tokens.forEach((token, index) => {
        result[token] = match[index + 1];
    });

    let hour = Number(
        result.HH ??
        result.H ??
        result.hh ??
        result.h ??
        0
    );

    const meridiem = result.A ?? result.a;

    if (meridiem?.toUpperCase() === "PM" && hour < 12) hour += 12;
    if (meridiem?.toUpperCase() === "AM" && hour === 12) hour = 0;

    const date = {
        year: Number(result.YYYY ?? ("20" + result.YY)),
        month: Number(result.MM ?? result.M) - 1,
        day: Number(result.DD ?? result.D),
        hour,
        minute: Number(result.mm ?? result.m ?? 0),
        second: Number(result.ss ?? result.s ?? 0)
    };

    return this.isValidDate(date) ? date : null;
    }

   getTokens() 
   {
        return this.format.match(
            /YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|A|a/g
        );
    }



    isValidDate(date) 
    {

        if (!date) return false;

        if (! Number.isFinite(date.year) ||  ! Number.isFinite(date.month) ||  ! Number.isFinite(date.day)) return false;

        if (date.month < 0 || date.month > 11) return false;
        if (date.day < 1 || date.day > 31) return false;
        if (date.hour < 0 || date.hour > 23) return false;
        if (date.minute < 0 || date.minute > 59)  return false;
        if (date.second < 0 || date.second > 59)  return false;
    

        return true;
    }

    isValidFormat(format) 
    {

        const tokens = format.match(/[A-Za-z]+/g);
        if (!tokens) return false;

        const valid = [
            "YYYY","YY",
            "MM","M",
            "DD","D",
            "HH","H",
            "hh","h",
            "mm","m",
            "ss","s",
            "A","a"
        ];

        return tokens.every(token => valid.includes(token));
    }
}