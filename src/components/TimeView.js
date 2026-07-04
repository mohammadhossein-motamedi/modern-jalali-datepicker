import {createTime} from "../utils/time";

export default function TimeView(state, events, options) {

    const wrapper = document.createElement("div");
    wrapper.className = "pdp-time-container";

    const container = document.createElement("div");
    container.className = "pdp-time";

    // make input
    function createSpinner(value, min, max ,step, onChange) {

        const wrapper = document.createElement("div");

        wrapper.className = "pdp-time-spinner";

        const up = document.createElement("button");

        up.type = "button";

        up.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        `;

        const input = document.createElement("input");

        input.type = "number";
        input.readOnly = true;
        input.min = min;

        input.max = max;

        input.value = String(value).padStart(2, "0");

        const down = document.createElement("button");
        

        down.type = "button";

        down.innerHTML = `
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            `;

        function increase() 
        {

            let current = Number(input.value);
                
            current + step <= max ? current += step : current = min;

            input.value = String(current).padStart(2, "0");

            onChange(current);

            events.change();

        }
        // decress input
        function decrease() 
        {

            let current = Number(input.value);

            current - step >= min ? current -= step  : current = max;

            input.value = String(current).padStart(2, "0");

            onChange(current);           
            events.change();

        }





        let interval = null;
        let timeout = null;

        function startIncrease(e) {

            e.preventDefault();
            e.stopPropagation();

            increase();

            if (step !== 1) return;

            clearTimeout(timeout);
            clearInterval(interval);

            timeout = setTimeout(() => {

                interval = setInterval(increase, 300);

            },400);

        }

        function stopIncrease() {

            clearTimeout(timeout);
            clearInterval(interval);

            timeout = null;
            interval = null;

        }

        up.addEventListener("mousedown", startIncrease);
        document.addEventListener("mouseup", stopIncrease);
        up.addEventListener("mouseleave", stopIncrease);


        
        function startDecrease(e) {

            e.preventDefault();
            e.stopPropagation();

            decrease();

            if (step !== 1) return;

            clearTimeout(timeout);
            clearInterval(interval);

            timeout = setTimeout(() => {

                interval = setInterval(decrease, 200);

            }, 400);

        }

        function stopDecrease() {

            clearTimeout(timeout);
            clearInterval(interval);

            timeout = null;
            interval = null;

        }

        down.addEventListener("mousedown", startDecrease);
        document.addEventListener("mouseup", stopDecrease);
        down.addEventListener("mouseleave", stopDecrease);

        
        wrapper.onwheel = (e) => 
        {
            e.preventDefault();

            (e.deltaY < 0) ?  increase() : decrease();
        };


        

        wrapper.append(up);

        wrapper.append(input);

        wrapper.append(down);

        return wrapper;

    }

    
    // make hour
    const hour =  createSpinner(
        state.hour,
        state.hourFormat === 24 ? 0 : 1,
        state.hourFormat === 24 ? 23 : 12,
        options.hourStep ?? 1,
        value => state.hour = value
    );

    // make minute
    const minute = createSpinner(
        state.minute,
        0,
        59,
        options.minuteStep?? 1,
        value => state.minute = value
    );

    container.append(hour);

    const colon1 = document.createElement("span");
    colon1.textContent = ":";
    container.append(colon1);

    container.append(minute);
   
    
    // make second
    if (state.showSeconds) {

        const colon2 = document.createElement("span");
        colon2.textContent = ":";

        container.append(colon2);

        const second = createSpinner(
            state.second,
            0,
            59,
            options.secondStep??1,
            value => state.second = value
        );

        container.append(second);

    }

    if (state.hourFormat === 12) {

        const meridiem = document.createElement("select");

        ["AM", "PM"].forEach(item => {

            const option = document.createElement("option");

            option.value = item;
            option.textContent = item;

            meridiem.append(option);

        });

        meridiem.value = state.meridiem;

        meridiem.onchange = () => {


            state.meridiem = meridiem.value;
       
            events.change();

        };

        container.append(meridiem);

    }

   wrapper.append(container);

    const messages = document.createElement("div");
    messages.className = "pdp-time-messages";

    
    if (state.minTime || state.maxTime) {

        const info = document.createElement("div");

        info.className = state.classes.textInfo;

        if (state.minTime && state.maxTime) {

            info.textContent =
                `محدوده مجاز: ${createTime(state.minTime)} تا ${createTime(state.maxTime)}`;

        } else if (state.minTime) {
            
            
            info.textContent =
                `حداقل زمان مجاز: ${createTime(state.minTime)}`;
            
        } else {

            info.textContent =
                `حداکثر زمان مجاز: ${createTime(state.maxTime)}`;
           
            
        }

        messages.append(info);

    }

     const messages2 = document.createElement("div");
    messages2.className = "pdp-time-messages";

    if ((state.multiple ?? 0) > 1) 
    {
        
           
        
        const multiple = document.createElement("div");
        multiple.className = state.classes.textCountSelect;
        multiple.textContent = `تعداد مجاز انتخاب: ${state.multiple ?? 1}`;
        messages2.append(multiple);
    }
    
    if (state.timeError) {

        const error = document.createElement("div");

        error.className = state.classes.textError;

        error.textContent = state.timeError;

        messages.append(error);

    }

    wrapper.append(messages);
    wrapper.append(messages2);
    return wrapper;
            
    

}