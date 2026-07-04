export default function Footer(state, events ,options) 
{


    const footer = document.createElement("div");
    footer.className =  state.classes.footer;
    if (!state.footer) return footer;
    

    // btn today
    if (state.footer.today) 
    {
        const btn = document.createElement("button");
        btn.textContent = "امروز";
        btn.className = state.classes.btnToday;
        btn.onclick = events.today;

        footer.appendChild(btn);

    }

    // btn clear
    if (state.footer.clear) 
    {
        const btn = document.createElement("button");
        btn.textContent = "پاک کردن";
        btn.className = state.classes.btnClear;
        btn.onclick = events.clear;

        footer.appendChild(btn);

    }

    // btn close
    if (state.footer.close) 
    {
        const btn = document.createElement("button");
        btn.textContent = "بستن";
        btn.className = state.classes.btnClose;
        btn.onclick = events.close;
        footer.appendChild(btn);
    }

    return footer;

}