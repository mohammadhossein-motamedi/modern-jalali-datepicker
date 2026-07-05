# Modern Jalali DatePicker

> A modern, lightweight and fully customizable Jalali (Persian) Date Picker written in pure JavaScript.

![npm version](https://img.shields.io/npm/v/modern-jalali-datepicker)
![license](https://img.shields.io/npm/l/modern-jalali-datepicker)
![javascript](https://img.shields.io/badge/javascript-ES6-yellow)
![npm downloads](https://img.shields.io/npm/dm/modern-jalali-datepicker)

Modern Jalali DatePicker is a lightweight JavaScript library for selecting Persian (Jalali) dates. It supports single date selection, date range, multiple dates, time picker, custom themes, events and more.

## ✨ Features

* 📅 Single Date Picker
* 📆 Date Range Picker
* 📌 Multiple Date Selection
* ⏰ Time Picker (12h / 24h)
* ⏱ Optional Seconds
* 📅 Min / Max Date
* ⏰ Min / Max Time
* 🚫 Disabled Dates
* 🎨 Fully Customizable Themes
* 🎯 Custom Day Classes
* 🔔 Custom Events
* 📦 ES Module Support
* ⚡ Lightweight
* 🌙 Dark Mode Ready
* 🚀 Zero Framework Dependency (Except `jalaali-js`)

## 📦 Installation

Install using **npm**:

```bash
npm install modern-jalali-datepicker
```

Or using **yarn**:

```bash
yarn add modern-jalali-datepicker
```

Or using **pnpm**:

```bash
pnpm add modern-jalali-datepicker
```

## 🚀 Quick Start

### HTML

```html
<input id="datepicker" />
```

### JavaScript

```javascript
import DatePicker from "modern-jalali-datepicker";
import "modern-jalali-datepicker/style.css";

const picker = new DatePicker({element:"#datepicker"});
```

This creates a basic Jalali date picker using the default configuration.

## ⚙️ Configuration

The date picker accepts an optional configuration object.

```javascript
const picker = new DatePicker(
    {element:"#datepicker", 
    // options
});


```
## 📝 Date Format

Customize how dates are displayed in the input and returned by methods.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    format:"YYYY/MM/DD"
});
```

### Supported Tokens

| Token  | Description        | Example |
| ------ | ------------------ | ------- |
| `YYYY` | 4-digit year       | `1405`  |
| `YY`   | 2-digit year       | `05`    |
| `MM`   | Month (2 digits)   | `04`    |
| `M`    | Month              | `4`     |
| `DD`   | Day (2 digits)     | `09`    |
| `D`    | Day                | `9`     |
| `HH`   | 24-hour (2 digits) | `09`    |
| `H`    | 24-hour            | `9`     |
| `hh`   | 12-hour (2 digits) | `09`    |
| `h`    | 12-hour            | `9`     |
| `mm`   | Minutes            | `30`    |
| `ss`   | Seconds            | `45`    |
| `A`    | AM / PM            | `AM`    |
| `a`    | am / pm            | `am`    |
> **Note:** Time format tokens require `time: true`.
> **Note:** A and a are available only when `hourFormat: 12` and `time: true` are enabled.
### Examples

```javascript
format:"YYYY/MM/DD"
```

Output

```
1405/04/15
```

```javascript
format:"YY-MM-DD"
```

Output

```
05-04-15
```

```javascript
format:"DD/MM/YYYY"
```

Output

```
15/04/1405
```

```javascript
format:"YYYY-MM-DD HH:mm:ss"
```

Output

```
1405-04-15 18:30:45
```

```javascript
format:"YYYY/MM/DD hh:mm A"
```

Output

```
1405/04/15 06:30 PM
```


### Available Options

| Option          | Type                | Default  | Description                           |
| --------------- | ------------------- | -------  | ------------------------------------- |
| `range`         | `boolean`           | `false`  | Enable date range selection.          |
| `multiple`      | `number`            | `0`      | Maximum number of selectable dates.   |
| `time`          | `boolean`           | `false`  | Enable time picker.                   |
| `hourFormat`    | `12 \| 24`          | `24`     | Display time in 12 or 24-hour format. |
| `showSeconds`   | `boolean`           | `true`   | Show seconds selector.                |
| `hourStep`      | `number`            | `1`      | Hour increment step.                  |
| `minuteStep`    | `number`            | `1`      | Minute increment step.                |
| `secondStep`    | `number`            | `1`      | Second increment step.                |
| `minDate`       | `string`            | `null`   | Minimum selectable date.              |
| `maxDate`       | `string`            | `null`   | Maximum selectable date.              |
| `defaultDate`   | `string`            | `null`   | Initial selected date.                |
| `minTime`       | `string`            | `null`   | Minimum selectable time.              |
| `maxTime`       | `string`            | `null`   | Maximum selectable time.              |
| `disabledDates` | `Array \| Function` | `[]`     | Disable specific dates.               |
| `dayClassName`  | `Function`          | `null`   | Add custom class to days.             |
| `footer`        | `Object`            | Default  | Configure footer buttons.             |
| `classes`       | `Object`            | Default  | Override CSS classes.                 |
| `events`        | `Object`            | `{}`     | Display custom events on calendar.    |

## 📆 Range

Enable date range selection.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    range:true
});
```

## 📌 Multiple

Select multiple dates.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    multiple:5
});
```
## ⏰ Time

Enable the time picker.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    time:true
});
```
## 🕒 Hour Format

Display time in **12-hour** or **24-hour** format.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    time:true,
    hourFormat:12
});
```

Available values:

* `12` → 12-hour format (AM / PM)
* `24` → 24-hour format (default)

---

## ⏱ Show Seconds

Show or hide the seconds selector.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    time:true,
    showSeconds:false
});
```

---

## ⬆️ Hour Step

Increase or decrease hours by a custom step.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    time:true,
    hourStep:2
});
```

---

## ⬆️ Minute Step

Increase or decrease minutes by a custom step.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    time:true,
    minuteStep:5
});
```

---

## ⬆️ Second Step

Increase or decrease seconds by a custom step.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    time:true,
    secondStep:10
});
```
## 📅 Minimum Date

Prevent users from selecting dates before a specific date.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    minDate:"1405/01/01"
});
```

---

## 📅 Maximum Date

Prevent users from selecting dates after a specific date.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    maxDate:"1405/12/29"
});
```

---

## 📅 Default Date

Set the initial selected date.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    defaultDate:"1405/04/15"
});
```

---

## ⏰ Minimum Time

Prevent selecting a time earlier than the specified value.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    time:true,
    minTime:"09:30"
});
```

---

## ⏰ Maximum Time

Prevent selecting a time later than the specified value.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    time:true,
    maxTime:"18:00"
});
```

---

## 🚫 Disabled Dates

Disable specific dates.

```javascript
const picker = new DatePicker({
    element: "#datepicker",
    disabledDates:[
        "1405/01/10",
        "1405/01/15",
        "1405/02/01"
    ]
});
```

Or disable dates dynamically using a callback:

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    disabledDates(date){

        return date.weekDay===6;


    }
});
```

## 🎨 Custom Day Class

Apply custom CSS classes to specific days.

```javascript
const picker = new DatePicker({
    element: "#datepicker",
    dayClassName(date){

        if(date.weekDay===6) return "holiday";

        if(date.weekDay===1) return "first-day";

    }
});
```

---

## 🔘 Footer

Customize footer buttons.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    footer:{
        today:true,    //default true
        clear:true,     //default true
        close:true      //default true
    }
});
```

Disable a button:

```javascript
const picker = new DatePicker({
    element: "#datepicker",
    footer:{
        clear:false
    }
});
```

---

## 🎭 Custom Classes

Override the default CSS classes.

```javascript
const picker = new DatePicker({
    element :"#datepicker",
    classes:{
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
    }
});
```

---

### 📌 Calendar Events

Display custom events on specific dates.

```javascript
const picker = new DatePicker({
    element:"#datepicker",
    events:{
        "1405-04-15":{
            type:"meeting",
            title:"Team Meeting"
        },

        "1405-04-18":{
            type:"birthday",
            title:"Ali's Birthday"
        },

        "1405-04-22":{
            type:"payment",
            title:"Pay Rent"
        }
    }
});
```

### Available Event Types

| Type        | Icon |
| ----------- | ---- |
| `meeting`   | 🧡   |
| `birthday`  | 🎂   |
| `payment`   | 💰   |
| `note`      | 📌   |
| `warning`   | ⚠️   |
| `travel`    | ✈️   |
| `study`     | 📚   |
| `medical`   | 🩺   |
| `party`     | 🎉   |
| `important` | ⭐   |


## 🎨 Theme (HTML)

You can specify the theme directly on the input element.

```html
<input id="datepicker" theme="light">
```

### Available Values

| Value   | Description                            |
| ------- | -------------------------------------- |
| `light` | Always use the light theme.            |
| `dark`  | Always use the dark theme.             |
| `auto`  | Follow the user's system color scheme. |

### Examples

```html
<input id="datepicker" theme="light"> //default
```

```html
<input id="datepicker" theme="dark">
```

```html
<input id="datepicker" theme="auto">
```

> **🖤 Special Theme**
>
> Regardless of the selected theme (`light`, `dark`, or `auto`), the calendar automatically switches to **Dark Mode** on the **18th and 19th of Dey (دی)** to commemorate those dates.
## setTheme()

Changes the calendar theme programmatically.

```javascript
picker.setTheme("dark");
```

### Parameters

| Parameter | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| `theme`   | `string` | `"light"`, `"dark"` or `"auto"` |

### Example

```javascript
picker.setTheme("light");

picker.setTheme("dark");

picker.setTheme("auto");
```
## pdp:theme

Triggered whenever the calendar theme changes.

```javascript

document.dispatchEvent(new CustomEvent("pdp:theme",
     {
          detail : {theme:"dark"} // "light" | "dark" | "auto"
     }
));

```

### Event Detail

| Property       | Description                                        |
| -------------- | -------------------------------------------------- |
| `event.detail` | The new active theme (`light`, `dark`, or `auto`). |


# 📚 Methods

## getDate()

Returns the currently selected value.

```javascript
picker.getDate();
```

### Returns

#### Single Selection

```javascript
"1405/04/15"
```

#### Range Selection

```javascript
{
    start:"1405/04/10",
    end:"1405/04/15"
}
```

#### Multiple Selection

```javascript
[
    "1405/04/10",
    "1405/04/15",
    "1405/04/20"
]
```

### Example

```javascript
const value = picker.getDate();

console.log(value);
```


## setDate()

Programmatically sets the selected date.

```javascript
picker.setDate(value);
```

### Parameters

#### Single Selection

Pass a date string using the current `format`.

```javascript
picker.setDate("1405/04/15");
```

---

#### Range Selection

When `range:true` is enabled, pass an object containing `start` and `end`.

```javascript
picker.setDate({
    start:"1405/04/10",
    end:"1405/04/20"
});
```

> **Note**
>
> The date string must match the current `format` option.

## destroy()

Destroys the date picker instance and removes all attached event listeners.

```javascript
picker.destroy();
```

After calling this method, the date picker will no longer function.


# 🔔 Events

## onSelect

Triggered when a date is selected.

```javascript
const picker = new DatePicker({element:"#datepicker",
    onSelect(date){
        console.log(date);
    }
});
```

## onOpen

Opens the date picker popup.

```javascript
const picker = new DatePicker({element:"#datepicker",
    onOpen(){
        console.log(" date picker opened");
    }
});
```

## onClose

Closes the date picker popup.

```javascript
const picker = new DatePicker({element:"#datepicker",
    onClose(){
        console.log(" date picker closed");
    }
});
```
