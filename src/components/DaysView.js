import Calendar from "../core/Calendar";
import eventTypes from "../data/eventTypes";

export default function DaysView(state ,events) {
     

    const calendar = new Calendar();

    const container = document.createElement("div");
    container.className = "pdp-days";

    const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

    weekDays.forEach(name => {
        const item = document.createElement("div");
        item.className = "pdp-weekday";
        item.textContent = name;

        container.appendChild(item);
    });

    const days = calendar.getMonth(
                    state.currentYear,
                    state.currentMonth
                );
   
   
    days.forEach(day => 
        {
            const button = document.createElement("button");
            button.className = "pdp-day";

        // renge date 
            // selected-start
            if (
            state.rangeStart &&
            day.day === state.rangeStart.day &&
            day.month === state.rangeStart.month &&
            day.year === state.rangeStart.year
            ) 
            {
                button.classList.add( state.classes.rangeStart,  state.classes.range);
            }

            //range end
            if (
            state.rangeEnd &&
            day.day === state.rangeEnd.day &&
            day.month === state.rangeEnd.month &&
            day.year === state.rangeEnd.year
            ) 
            {
                button.classList.add( state.classes.rangeEnd , state.classes.range);
            }


            // range boy
            if (
                state.rangeStart &&
                state.rangeEnd &&
                calendar.compareDates(day, state.rangeStart) > 0 &&
                calendar.compareDates(day, state.rangeEnd) < 0
            ) 
            {
                button.classList.add(state.classes.range);
            }

            // function add dey to class
            if (typeof state.dayClassName === "function") 
            {
                const className = state.dayClassName(day);
                if (className) button.classList.add(className);  
            }

        // disable day  
        let disabled = false;
        if (state.minDate && calendar.compareDates(day, state.minDate) < 0) disabled = true;
        if (state.maxDate && calendar.compareDates(day, state.maxDate) > 0) disabled = true;
        

        // disible option  array
        if (Array.isArray(state.disabledDates)) 
        {
            if (state.disabledDates.some(date => calendar.isSameDate(day, date))) disabled = true;
        }

       // disible option  function
        if (typeof state.disabledDates === "function") 
        {
            if (state.disabledDates(day)) disabled = true;
        }


        if (disabled) 
        {
            button.disabled = true;
            button.classList.add(state.classes.disabled);
        }

        
        // btn empty 
        button.textContent = day.day ?? "";
        if (!day.current) button.classList.add("empty");
        

       

        // select today 
        if(day.current && !disabled)
        {
            button.classList.add(state.classes.hover);
            button.onclick = ()=>events.select(day);
        }
        
      
        
     
        // select multiple
        if (
            state.multiple > 0 &&
            state.selectedDates.some(item =>
                item.day === day.day &&
                item.month === day.month &&
                item.year === day.year
            )
        ) {
              
            button.classList.add(state.classes.selected);

        }
       
        if (
            (state.multiple ?? 0)  === 0 &&
            state.selectedDate &&
            state.selectedDate.day === day.day &&
            state.selectedDate.month === day.month &&
            state.selectedDate.year === day.year
        ) {
            button.classList.add(state.classes.selected);

        }
        const hasSelectedDate = state.selectedDate !== null;
        if (
            !hasSelectedDate &&
            state.today &&
            day.current &&
            day.day === state.today.day &&
            day.month === state.today.month &&
            day.year === state.today.year
        ) {
            button.classList.add(state.classes.today);
        }

        if (button.classList.contains(state.classes.selected)) button.classList.remove(state.classes.today);
        
        
      // add event user sent from in option
      
      
       const key = `${day.year}-${String(day.month +1).padStart(2,"0")}-${String(day.day).padStart(2,"0")}`;
       const event = state.events[key];
      
       if (event) 
        {

            const marker = document.createElement("span");
            marker.className = "pdp-event-marker";
            marker.textContent = eventTypes[event.type];

            button.append(marker);

            const tooltip = document.createElement("div");
            tooltip.className = "pdp-event-tooltip tolltip";
            tooltip.textContent = event.title;


            if (day.weekDay === 0)
            { tooltip.classList.add("tooltip-left");

            }else if (day.weekDay === 6) {
                tooltip.classList.add("tooltip-right");
            }
            button.append(tooltip);

        }

        // theme dark in  18 and 19 month day
        if(day.month  === 9 && (day.day === 18 || day.day === 19 ))
        {
            const heart = document.createElement("span");
            heart.className = "pdp-black-heart";
            heart.textContent = "🖤";
            button.append(heart);
        }
        container.appendChild(button);

    });

    return container;

}