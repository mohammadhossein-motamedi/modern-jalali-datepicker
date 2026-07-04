import Header from "./components/Header";
import DaysView from "./components/DaysView";
import State from "./core/State";
import Calendar from "./core/Calendar";
import Renderer from "./core/Renderer";
import MonthsView from "./components/MonthsView";
import YearsView from "./components/YearsView";
import Formatter from "./core/Formatter";
import Footer from "./components/Footer";
import TimeView from "./components/TimeView";
import createState from "./core/StateFactory";
import validateOptions from "./core/OptionValidator";
import {createTime} from "./utils/time";


export default class DatePicker 
{


    constructor(options = {}) 
    {

       

        this.options = options;


        this.formatter = new Formatter(
            this.options.format ?? "YYYY/MM/DD"
        );
         // وضعیت
       this.options = validateOptions(options ,this.state);
        this.state = createState(
                    this.options,
                    this.formatter
                );


        if (this.options.time) {

            const hasHour =
                /(HH|H|hh|h)/.test(this.formatter.format);

            const hasMinute =
                /(mm|m)/.test(this.formatter.format);

            const hasSecond =
                /(ss|s)/.test(this.formatter.format);
            const hasMeridiem =
                /(A|a)/.test(this.formatter.format);


            if (!hasHour || !hasMinute) {
                this.formatter.format += " HH:mm";
            }

            
            if (this.state.showSeconds && !hasSecond) {
                this.formatter.format += ":ss";
            }
            if (this.state.hourFormat === 12 && !hasMeridiem) {
                this.formatter.format += " A";
            }
        }

        this.input = document.querySelector(options.element);

        if (!this.input)  throw new Error("Input not found.");
        

        this.onInputClick = () => this.open();

        this.input.addEventListener(
            "click",
            this.onInputClick
        );



      

        //close by click outside
        this.onDocumentClick = (e) => 
        {
               

            if (
                !this.state.isRange &&
                (this.state.multiple ?? 0) === 0 &&
                !this.container.contains(e.target) &&
                e.target!==this.input
            ) {

                this.close();
                
                
            }

        };
        document.addEventListener(
            "click",
            this.onDocumentClick
        );

        // change theme by event 
        this.onThemeChange =  (e) => { 
            if (today.month === 9 && (today.day === 18 || today.day === 19)) 
            {
                this.setTheme('dark');
                return;
            }
            
            
            this.setTheme((e.detail?.theme) ?? 'light')
        };
        document.addEventListener("pdp:theme", this.onThemeChange);
        

        
        
       
        // Calendar engine
        this.calendar = new Calendar();
        const today = this.calendar.today();
        this.state.today = today;

        const iranTime = this.calendar.getIranTime();

        this.state.hour = iranTime.hour;
        this.state.minute = iranTime.minute;
        this.state.second = iranTime.second;

        if (!this.state.selectedDate) 
        {
            this.state.currentYear = today.year;
            this.state.currentMonth = today.month;

        }

        // The main element of the calendar
        this.container = document.createElement("div");
        this.container.className = "pdp";

        const theme = this.input.getAttribute("theme") || "light";
        this.container.classList.add(`pdp-${theme}`);

        document.body.appendChild(this.container);

        if (this.state.selectedDate) 
        {
            
            this.input.value = this.formatter.formatDate( this.state.selectedDate, this.state);

        }

        //render
        this.renderer = new Renderer(this.container);

        this.render();
        
    }



  
    
    render() {

        const body = document.createElement("div");
        body.className =  this.state.classes.body;
        if (this.state.view === "days") 
        {
            body.appendChild(
                DaysView(this.state,{
                    select:(day)=>this.selectDate(day)
                })
            );

        }
          
        if (this.state.showTime && this.state.view === "days") 
        {
            body.appendChild(
                TimeView(this.state,
                        {
                            change: () => this.changeTime()
                        },
                        this.options
                    )
        );

        }

        if (this.state.view === "months") 
        {
            body.appendChild(
                MonthsView(this.state,{
                    selectMonth:(month)=>this.selectMonth(month)
                })
            );

        }
        if (this.state.view === "years") 
        {
            body.appendChild(
              
                YearsView(this.state, {
                    selectYear: (year) => this.selectYear(year),
                    prevYears: () => this.prevYears(),
                    nextYears: () => this.nextYears()
                })

            );

        }

        this.renderer.render(

            Header(this.state,
                    {

                    prevMonth: () => {

                        if (this.state.view === "years") {
                            this.prevYears();
                        } else {
                            this.prevMonth();
                        }

                    },

                    nextMonth: () => {

                        if (this.state.view === "years") {
                            this.nextYears();
                        } else {
                            this.nextMonth();
                        }

                    },

                    showMonths: () => this.showMonths(),

                    showYears: () => this.showYears()

                },this.options
            ),

            body,
           Footer(this.state, 
                {

                    today: () => this.goToday(),

                    clear: () => this.clear(),

                    close: () => this.close()

                },
                this.options
            )

        );

    }

    //get prov month
    prevMonth() {

        this.state.currentMonth--;
        if (this.state.currentMonth < 0) 
        {
            this.state.currentMonth = 11;
            this.state.currentYear--;

        }
        this.refresh();

    }

    // get next month
    nextMonth() 
    {
        this.state.currentMonth++;
        if (this.state.currentMonth > 11) 
        {
            this.state.currentMonth = 0;
            this.state.currentYear++;
        }

        this.refresh();

    }
    // refresh
    refresh() 
    {
        this.render();
    }

    // seleect day
    selectDate(day)
    {
       
        // select multi data
        if (this.state.multiple > 0) {

            const index = this.state.selectedDates.findIndex(item =>
                item.year === day.year &&
                item.month === day.month &&
                item.day === day.day
            );

            if (index !== -1) 
            {
                this.state.selectedDates.splice(index, 1);

            } else {
                
                if (this.state.selectedDates.length >= this.state.multiple) return;

                this.state.selectedDates.push({
                    ...day,
                    hour: this.state.hour,
                    minute: this.state.minute,
                    second: this.state.second
                });
                

            }

            this.input.value = this.state.selectedDates.map(date => this.formatter.formatDate(date, this.state)).join(" , ");

           this.render()
            return;

        }

        // select one date
        if(!this.state.isRange)
        {
            this.state.selectedDate = {
                ...day,
                hour: this.state.hour,
                minute: this.state.minute,
                second: this.state.second
            };

            if (this.state.timeError) return;
            if (typeof this.options.onSelect === "function") 
            {
                this.options.onSelect(
                    this.formatter.formatDate(this.state.selectedDate , this.state)
                );

            }

            this.state.currentYear = day.year;
            this.state.currentMonth = day.month;

            this.input.value = this.formatter.formatDate(this.state.selectedDate , this.state);          

            this.render();

            this.close();
            return;

        }


        // حالت Range (فعلاً فقط تست)

        if (!this.state.rangeStart) {

            this.state.rangeStart = {
                ...day,
                hour: this.state.hour,
                minute: this.state.minute,
                second: this.state.second
            };

           this.input.value = this.formatter.formatDate(this.state.rangeStart, this.state);

            this.render();
            return;



        }
        else if (!this.state.rangeEnd) {

            this.state.rangeEnd = {
                ...day,
                hour: this.state.hour,
                minute: this.state.minute,
                second: this.state.second
            };
            if (this.calendar.compareDates( this.state.rangeStart, this.state.rangeEnd) > 0)
            {
                const temp = this.state.rangeStart;

                this.state.rangeStart = this.state.rangeEnd;

                this.state.rangeEnd = temp;
            }

            this.input.value =
                this.formatter.formatDate(this.state.rangeStart, this.state) +
                " - " +
                this.formatter.formatDate(this.state.rangeEnd , this.state);
            this.render(); 
            return;

        }
        else {

            this.state.rangeStart = day;
            this.state.rangeEnd = null;

            this.render();

        }


        this.render();

        

    }

    showMonths()
    {

        this.state.view="months";
        this.render();

    }

    showDays()
    {
        this.state.view="days";
        this.render();

    }
    selectMonth(month)
    {
        this.state.currentMonth=month;
        this.showDays();

    }

   showYears() {

        this.state.view = "years";
        this.state.yearStart =
            this.state.currentYear - (this.state.currentYear % 12);

        this.render();

    }

    selectYear(year) 
    {
        this.state.currentYear = year;
        this.showMonths();
    }
    prevYears() 
    {
        this.state.yearStart -= 12;
        this.render();

    }

    nextYears() 
    {
        this.state.yearStart += 12;
        this.render();

    }

    open()
    {
       this.applyTheme();
        
        this.validateTime();
        const rect=this.input.getBoundingClientRect();
    
        this.container.style.right  =`7%`;

        this.container.style.top =rect.bottom + window.scrollY + 8 + "px";

        
        this.container.style.display="block";

        if (typeof this.options.onOpen === "function") this.options.onOpen();
        this.render();
    }

    close() 
    {
  
        this.container.style.display="none";
        if (typeof this.options.onClose === "function") this.options.onClose();
    }

    goToday() 
    {

        const today = this.calendar.today();

        this.state.currentYear = today.year;
        this.state.currentMonth = today.month;
        this.selectDate(today);

    }
    clear() 
    {

        this.state.selectedDate = null;
        this.state.rangeStart = null;
        this.state.rangeEnd = null;
        this.input.value = "";
        this.render();

    }
    getDate()
    {
        // Range
        if (this.state.isRange) 
        {
            return {
                start: this.state.rangeStart
                    ? this.formatter.formatDate(this.state.rangeStart, this.state)
                    : null,

                end: this.state.rangeEnd
                    ? this.formatter.formatDate(this.state.rangeEnd, this.state)
                    : null
            };

        }
        // Multiple
        if (this.state.multiple > 0)
        {
            return this.state.selectedDates.map(date =>
                this.formatter.formatDate(date, this.state, true)
            );
        }

        // Single
        return this.state.selectedDate
            ? this.formatter.formatDate(this.state.selectedDate, this.state)
            : null;

    }
    
    setDate(value) 
    {
        if (!this.state.isRange) 
        {
            const date = this.formatter.parseDate(value);

            this.state.selectedDate = date;
            this.state.currentYear = date.year;
            this.state.currentMonth = date.month;
            this.input.value = this.formatter.formatDate(date,this.state);
           
            
            this.render();
            return;
        }
    

        if (!value.start || !value.end) 
        {
            console.log("لطفاً تاریخ دوم را نیز وارد کنید.");
            return;
        }

        this.state.rangeStart = this.formatter.parseDate(value.start);
        this.state.rangeEnd = this.formatter.parseDate(value.end);

        this.input.value =
            this.formatter.formatDate(this.state.rangeStart , this.state) +
            " - " +
            this.formatter.formatDate(this.state.rangeEnd , this.state);

        this.render();
        

    }
    destroy() 
    {

        this.input.removeEventListener(
            "click",
            this.onInputClick
        );
        document.removeEventListener(
            "click",
            this.onDocumentClick
        );
        document.removeEventListener(
            "pdp:theme",
            this.onThemeChange
        );
        this.container.remove();
    }

    changeTime() 
    {
       
        
        if (!this.state.isRange && !this.state.selectedDate) 
        {
            const today = this.calendar.today();
            this.state.selectedDate = {
                year: today.year,
                month: today.month,
                day: today.day,

                hour: this.state.hour,
                minute: this.state.minute,
                second: this.state.second

            };

        }
 
        // update date selected
        if (!this.state.isRange && this.state.selectedDate) 
        {
            this.state.selectedDate.hour = this.state.hour;
            this.state.selectedDate.minute = this.state.minute;
            this.state.selectedDate.second = this.state.second;

        }

        // update range
        if (this.state.isRange) 
        {
            if (this.state.rangeStart && !this.state.rangeEnd) 
            {
                this.state.rangeStart.hour = this.state.hour;
                this.state.rangeStart.minute = this.state.minute;
                this.state.rangeStart.second = this.state.second;

            }

            if (this.state.rangeEnd) 
            {
                this.state.rangeEnd.hour = this.state.hour;
                this.state.rangeEnd.minute = this.state.minute;
                this.state.rangeEnd.second = this.state.second;

            }
            
        }

        // min && max time
        this.validateTime();

        if (!this.state.isRange && this.state.selectedDate) 
        {
            this.state.selectedDate.hour = this.state.hour;
            this.state.selectedDate.minute = this.state.minute;
            this.state.selectedDate.second = this.state.second;
        }

        if (this.state.isRange) 
        {

            if (this.state.rangeStart) 
            {
                this.state.rangeStart.hour = this.state.hour;
                this.state.rangeStart.minute = this.state.minute;
                this.state.rangeStart.second = this.state.second;

            }

            if (this.state.rangeEnd) 
            {

                this.state.rangeEnd.hour = this.state.hour;
                this.state.rangeEnd.minute = this.state.minute;
                this.state.rangeEnd.second = this.state.second;

            }
               
        }
        
        if (this.state.timeError) 
        {
            this.render();
            return;
        }
        
        // make value
        const value = this.state.isRange
            ? (this.state.rangeStart
                ? this.formatter.formatDate(this.state.rangeStart , this.state) +
                (this.state.rangeEnd
                    ? " - " + this.formatter.formatDate(this.state.rangeEnd , this.state)
                    : "")
                : "")
            : (this.state.selectedDate
                ? this.formatter.formatDate(this.state.selectedDate, this.state)
                : "");

        this.input.value = value;
        this.render();

    }


    parseTime(value) 
    {

        const parts = value.split(":");

        return {

            hour: Number(parts[0]),
            minute: Number(parts[1]),
            second: Number(parts[2] ?? 0)

        };

    }

    compareTime(time1, time2) 
    {

        if (time1.hour !== time2.hour)  return time1.hour - time2.hour;
        if (time1.minute !== time2.minute) return time1.minute - time2.minute;

        return time1.second - time2.second;

    }
    pad(value) {

        return String(value).padStart(2, "0");

    }

   validateTime() 
   {
       
        const current = {
            hour: this.state.hour,
            minute: this.state.minute,
            second: this.state.second
        };
       
        
        this.state.timeError = "";
        if (this.options.minTime) 
        {
            const min = this.parseTime(this.options.minTime);
            if (this.compareTime(current, min) < 0) 
            {
                this.state.timeError =
                    `حداقل زمان ${this.options.minTime} است.`;

            }

        }

        if (!this.state.timeError && this.options.maxTime) 
        {
            
            
            const max = this.parseTime(this.options.maxTime);
            if (this.compareTime(current, max) > 0) {
                this.state.timeError =
                    `حداکثر زمان ${createTime(this.state.maxTime)} است.`;

            }

        }

    }
    applyTheme() 
    {
        

        let today = new Calendar().today();
        let theme = this.input.getAttribute("theme") || "light";
        
        if (today.month === 9 && (today.day === 18 || today.day === 19)) 
        {
            console.info("🖤In memory of our young people, the calendar will be displayed in 'dark mode' on the 18th and 19th of Dey.");
            theme = "dark";
        }

       
        if (theme === "auto") theme = document.documentElement.getAttribute("theme") || "light";
        this.container.classList.remove("pdp-light", "pdp-dark");
        this.container.classList.add(`pdp-${theme}`);

    }
    setTheme(theme) 
    {

        if (!["light", "dark", "auto"].includes(theme)) return false;
        this.input.setAttribute("theme", theme);
        this.applyTheme();

        return true;
    }

    
}