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


   parseInputDate(value)
    {
        if (typeof value !== "string") return null;

        value = value.trim();

        let hour = 0;
        let minute = 0;
        let second = 0;

        //extraction time
        const timeMatch = value.match(/(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/);

        if (timeMatch) {
            hour = Number(timeMatch[1]);
            minute = Number(timeMatch[2]);
            second = Number(timeMatch[3] ?? 0);

            value = value.replace(timeMatch[0], "").trim();
        }

        //extraction date
        const dateMatch = value.match(/^(\d{4})[\/.-](\d{1,2})[\/.-](\d{1,2})$/);

        if (!dateMatch) return null;

        const date = {
            year: Number(dateMatch[1]),
            month: Number(dateMatch[2]) - 1,
            day: Number(dateMatch[3]),
            hour,
            minute,
            second
        };

        return this.isValidDate(date) ? date : null;
    }
}