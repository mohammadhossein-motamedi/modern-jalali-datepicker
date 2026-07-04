export default function Header(state, events ,options) 
{

    const months = [
        "فروردین","اردیبهشت","خرداد",
        "تیر","مرداد","شهریور",
        "مهر","آبان","آذر",
        "دی","بهمن","اسفند"
    ];


    const header = document.createElement("div");
    header.className =   state.classes.header;

    // prev btn
    const prev = document.createElement("button");
    prev.className = "pdp-nav";
    prev.textContent = "❮";

    
    const title = document.createElement("div");
    title.className = "pdp-title";

    //current month
    const month = document.createElement("button");
    month.className = "pdp-month";
    month.textContent = months[state.currentMonth];


    // current year
    const year = document.createElement("button");
    year.className = "pdp-year";
    year.textContent = state.currentYear;

    // next btn
    const next = document.createElement("button");
    next.className = "pdp-nav";
    next.textContent = "❯";

    // events
    prev.onclick = () => events.prevMonth();
    next.onclick = () => events.nextMonth();

    month.onclick = (e) =>
    {
        e.stopPropagation();
        events.showMonths();
    } 
    year.onclick = (e) =>
    {
        e.stopPropagation();
        events.showYears();
    }

    //make header
    title.append(month, year);
    header.append(prev, title, next);

    
    return header;

}