import State from "./State";
export default function createState(options, formatter) 
{
    const state = new State();
    
    // custom class 
    if(  options.classes &&  typeof options.classes === "object" && !Array.isArray(options.classes))
    {
        state.classes = 
        {
            ...state.classes,
            ...(options.classes || {})
        };
    }

    // footer
    if (options.footer && typeof options.footer === "object" && !Array.isArray(options.footer)) 
    {
        state.footer = {
            ...state.footer,
            ...(options.footer ?? {})
        };
    }

    // range
    state.isRange = typeof options.range === "boolean" ? options.range : state.isRange;
    // multiple
    state.multiple = typeof options.multiple === "number" ? options.multiple  : state.multiple;

    // min date
    state.minDate = parseOptionDate(options.minDate,formatter);

    // max date
    state.maxDate = parseOptionDate(options.maxDate,formatter);

    // disable date
    if (typeof options.disabledDates === "function") 
    {
        state.disabledDates = options.disabledDates;
        
    } else if (Array.isArray(options.disabledDates)) 
    {
        state.disabledDates = Array.isArray(options.disabledDates)? 
            options.disabledDates
            .filter(v => typeof v === "string")
            .map(v => formatter.parseInputDate(v))
            .filter(d =>
                d &&
                Number.isInteger(d.year) &&
                Number.isInteger(d.month) &&
                Number.isInteger(d.day)
            )
        : [];

    } else {

        state.disabledDates = [];

    }
    

    // default date
    state.selectedDate = parseOptionDate(options.defaultDate,formatter);
    if (state.selectedDate) 
    {

        state.currentYear = state.selectedDate.year;
        state.currentMonth = state.selectedDate.month;

        state.hour = state.selectedDate.hour;
        state.minute = state.selectedDate.minute;
        state.second = state.selectedDate.second;

    }

    // day class
    state.dayClassName = typeof options.dayClassName === "function"  ? options.dayClassName : null;

    // status clock 
    
    state.showTime = typeof options.time === "boolean" ? options.time : false;

    state.hourFormat = typeof options.hourFormat === "number" ? options.hourFormat : 24;

    state.showSeconds = typeof options.showSeconds === "boolean" ? options.showSeconds : true;

    state.minuteStep = typeof options.minuteStep === "number" ? options.minuteStep : 1;

    state.hourStep = typeof options.hourStep === "number" ? options.hourStep : 1;

    state.secondStep = typeof options.secondStep === "number" ? options.secondStep : 1;

    state.minTime = parseOptionTime(options.minTime);
    
    state.maxTime = parseOptionTime(options.maxTime);

    // event
    
    if (options.events && typeof options.events === "object" && !Array.isArray(options.events)) 
    {
        state.events = {};

        Object.entries(options.events).forEach(([key, value]) => {
            const date = formatter.parseInputDate(key);

            if (!date) return;

            const normalizedKey =
                `${date.year}-${String(date.month + 1).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;

            state.events[normalizedKey] = value;
        });
    }
    
    

    
    
    // validation between options
    if (state.showTime && (state.isRange || (state.multiple ?? 0) > 0)) {

        console.warn(
            "[PersianDatePicker] 'time' cannot be used with 'range' or 'multiple'. Time has been disabled."
        );

        
        state.showTime = false
    }
    
    return state;

}


function parseOptionDate(value, formatter)
{
    if (typeof value !== "string") return null;

    const date = formatter.parseInputDate(value);

    if (!date) {
        console.warn(`[PersianDatePicker] Invalid date "${value}".`);
        return null;
    }

    return date;
}


function parseOptionTime(value) 
{

    if (typeof value !== "string") return null;
    const match = value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);

    if (!match) {
        console.warn(`[PersianDatePicker] Invalid time "${value}".`);
        return null;
    }

    const hour = Number(match[1]);
    const minute = Number(match[2] );
    const second = Number(match[3] ?? 0);

    if (
        hour > 23 ||
        minute > 59 ||
        second > 59
    ) {
        console.warn(`[PersianDatePicker] Invalid time "${value}".`);
        return null;
    }

    return { hour, minute, second };
}

