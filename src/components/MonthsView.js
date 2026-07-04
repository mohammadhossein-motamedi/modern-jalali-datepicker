const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
];

export default function MonthsView(state, events) 
{

    const container = document.createElement("div");
    container.className = "pdp-months";

    months.forEach((name, index) => 
    {
        const button = document.createElement("button");
        button.className = "pdp-month-item";
        button.textContent = name;

        if (index === state.currentMonth) button.classList.add("active");
        
        //event
        button.onclick = (e) =>
        {
            e.stopPropagation();
            events.selectMonth(index);
        }

        container.appendChild(button);

    });

    return container;

}