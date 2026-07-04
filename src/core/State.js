export default class State {

    constructor() {

        // Calendar
        this.currentYear = null;
        this.currentMonth = null;
        this.yearStart = this.currentYear - (this.currentYear % 12);
        this.view = "days";
        this.today = null;

        // Selection
        this.selectedDay = null;
        this.selectedDate = null;

        // Range
        this.isRange = false;
        this.rangeStart = null;
        this.rangeEnd = null;

        // Multiple
        this.multiple = 0;
        this.selectedDates = [];

        // Disabled
        this.disabledDates = [];

        // Events
        this.events = {};

        // Footer
        this.footer = {
            today: true,
            clear: true,
            close: true
        };

        // Time
        this.showTime = false;
        this.showSeconds = true;
        this.hourFormat = 24;

        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.meridiem = "AM";

        this.minTime = null;
        this.maxTime = null;
        this.timeError = "";

        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;

        // Classes
        this.classes = {
            selected: "selected",
            today: "today",
            hover: "hover",
            range: "in-range",
            rangeStart: "selected-start",
            rangeEnd: "selected-end",
            disabled: "disabled",

            header: "pdp-header",
            body: "pdp-body",
            footer: "pdp-footer",

            btnToday: "pdp-btn pdp-btn-today",
            btnClear: "pdp-btn pdp-btn-clear",
            btnClose: "pdp-btn pdp-btn-close",

            textInfo: "pdp-time-info",
            textError: "pdp-time-error",
            textCountSelect: "pdp-multiple-info"
        };

    }

}