export default function validateOptions(options = {} , state = {}) {

    // classes
    if (options.classes !== undefined && (typeof options.classes !== "object" || Array.isArray(options.classes))) 
    {
        console.warn("[PersianDatePicker] 'classes' must be an object.");
        options.classes = {};
    }

    // footer
    if (options.footer !== undefined && (typeof options.footer !== "object" || Array.isArray(options.footer)))
    {
        console.warn("[PersianDatePicker] 'footer' must be an object.");
        options.footer = {};
    }

    // range
    if (options.range !== undefined && typeof options.range !== "boolean") 
    {
        console.warn("[PersianDatePicker] 'range' must be a boolean.");
        options.range = false;
    }

    // multiple
    if (options.multiple !== undefined && typeof options.multiple !== "number") 
    {
        console.warn("[PersianDatePicker] 'multiple' must be a number.");
        options.multiple = 0;
    }

    // dayClassName
    if (options.dayClassName !== undefined && typeof options.dayClassName !== "function")
    {
        console.warn("[PersianDatePicker] 'dayClassName' must be a function.");
        options.dayClassName = null;
    }

    // time
    if (options.time !== undefined && typeof options.time !== "boolean") 
    {
        console.warn("[PersianDatePicker] 'time' must be a boolean.");
        options.time = false;
    }

    // hourFormat
    if (options.hourFormat !== undefined && ![12, 24].includes(options.hourFormat)) 
    {
        console.warn("[PersianDatePicker] 'hourFormat' must be 12 or 24.");
        options.hourFormat = 24;
    }

    // showSeconds
    if (options.showSeconds !== undefined && typeof options.showSeconds !== "boolean")
    {
        console.warn("[PersianDatePicker] 'showSeconds' must be a boolean.");
        options.showSeconds = false;
    }

    // steps
    ["hourStep", "minuteStep", "secondStep"].forEach(key => {

        if (options[key] !== undefined && typeof options[key] !== "number") 
        {
            console.warn(`[PersianDatePicker] '${key}' must be a number.`);
            options[key] = 1;
        }

    });

    // minDate , maxDate , defaultDate
    ["minDate", "maxDate", "defaultDate"].forEach(key => {

        if (options[key] !== undefined && typeof options[key] !== "string") 
        {
            console.warn(`[PersianDatePicker] '${key}' must be a string.` );
            options[key] = null;
        }

        if (options[key] !== undefined) 
        {
            if (!isValidJalaliDate(options[key])) {
                console.warn(
                    `[PersianDatePicker] '${key}' invalid format. Use YYYY/MM/DD`
                );
                options[key] = null;
            }
        }
            

    });

    // disabledDates
    if (options.disabledDates !== undefined && !Array.isArray(options.disabledDates) && typeof options.disabledDates !== "function") 
    {
        console.warn("[PersianDatePicker] 'disabledDates' must be an array or function.");
        options.disabledDates = [];
    }

    // events
    if (options.events !== undefined && (typeof options.events !== "object" || Array.isArray(options.events))) 
    {
        console.warn("[PersianDatePicker] 'events' must be an object.");
        options.events = {};
    }

    



   
    return options;



    function isValidJalaliDate(value) 
    {
        if (typeof value !== "string") return false;

        const match = value.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
        if (!match) return false;

        const [_, y, m, d] = match.map(Number);

        if (m < 1 || m > 12) return false;
        if (d < 1 || d > 31) return false;

        return true;
    }
}