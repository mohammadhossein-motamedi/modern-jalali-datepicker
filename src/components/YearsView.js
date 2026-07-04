
export default function YearsView(state, events) 
{

    const wrapper = document.createElement("div");
    wrapper.className = "pdp-years-wrapper";

    // btn  prev year
    const prev = document.createElement("button");
    prev.className = "pdp-years-prev";
    prev.innerHTML = "❮";
    prev.onclick = () => events.prevYears();

    const container = document.createElement("div");
    container.className = "pdp-years";

    // year
    for (let i = 0; i < 12; i++) {

        const year = state.yearStart + i;

        const button = document.createElement("button");

        button.className = "pdp-year-item";

        button.textContent = year;

        if (year === state.currentYear) {
            button.classList.add("active");
        }

        button.onclick = (e) => 
        {
            e.stopPropagation();
            events.selectYear(year);
        }

        container.appendChild(button);

    }
    // btn next year
    const next = document.createElement("button");
    next.className = "pdp-years-next";
    next.innerHTML = "❯";
    next.onclick = () => events.nextYears();

    wrapper.appendChild(prev);
    wrapper.appendChild(container);
    wrapper.appendChild(next);

    return wrapper;

}

