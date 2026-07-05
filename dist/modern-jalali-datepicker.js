//#region src/components/Header.js
function e(e, t, n) {
	let r = [
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
	], i = document.createElement("div");
	i.className = e.classes.header;
	let a = document.createElement("button");
	a.className = "pdp-nav", a.textContent = "❮";
	let o = document.createElement("div");
	o.className = "pdp-title";
	let s = document.createElement("button");
	s.className = "pdp-month", s.textContent = r[e.currentMonth];
	let c = document.createElement("button");
	c.className = "pdp-year", c.textContent = e.currentYear;
	let l = document.createElement("button");
	return l.className = "pdp-nav", l.textContent = "❯", a.onclick = () => t.prevMonth(), l.onclick = () => t.nextMonth(), s.onclick = (e) => {
		e.stopPropagation(), t.showMonths();
	}, c.onclick = (e) => {
		e.stopPropagation(), t.showYears();
	}, o.append(s, c), i.append(a, o, l), i;
}
//#endregion
//#region node_modules/jalaali-js/dist/index.js
var t = [
	-61,
	9,
	38,
	199,
	426,
	686,
	756,
	818,
	1111,
	1181,
	1210,
	1635,
	2060,
	2097,
	2192,
	2262,
	2324,
	2394,
	2456,
	3178
], n = t[0], r = t[t.length - 1] - 1;
function i(e, t, n) {
	return e instanceof Date ? d(f(e.getFullYear(), e.getMonth() + 1, e.getDate())) : d(f(e, t, n));
}
function a(e, t, n) {
	return p(u(e, t, n));
}
function o(e) {
	return g(e) === 0;
}
function s(e, t) {
	return t <= 6 ? 31 : t <= 11 || o(e) ? 30 : 29;
}
function c(e) {
	let { gy: t, march: n, jump: r, n: i } = m(e);
	return {
		leap: h(r, i),
		gy: t,
		march: n
	};
}
function l(e) {
	let { gy: t, march: n } = m(e);
	return {
		gy: t,
		march: n
	};
}
function u(e, t, n) {
	let r = l(e);
	return f(r.gy, 3, r.march) + (t - 1) * 31 - _(t, 7) * (t - 7) + n - 1;
}
function d(e) {
	let t = p(e).gy, n = t - 621, r = c(n), i = e - f(t, 3, r.march);
	if (i >= 0) {
		if (i <= 185) return {
			jy: n,
			jm: 1 + _(i, 31),
			jd: v(i, 31) + 1
		};
		i -= 186;
	} else --n, i += 179, r.leap === 1 && (i += 1);
	return {
		jy: n,
		jm: 7 + _(i, 30),
		jd: v(i, 30) + 1
	};
}
function f(e, t, n) {
	let r = _((e + _(t - 8, 6) + 100100) * 1461, 4) + _(153 * v(t + 9, 12) + 2, 5) + n - 34840408;
	return r = r - _(_(e + 100100 + _(t - 8, 6), 100) * 3, 4) + 752, r;
}
function p(e) {
	let t = 4 * e + 139361631;
	t = t + _(_(4 * e + 183187720, 146097) * 3, 4) * 4 - 3908;
	let n = _(v(t, 1461), 4) * 5 + 308, r = _(v(n, 153), 5) + 1, i = v(_(n, 153), 12) + 1;
	return {
		gy: _(t, 1461) - 100100 + _(8 - i, 6),
		gm: i,
		gd: r
	};
}
function m(e) {
	if (!Number.isFinite(e) || e < n || e > r) throw RangeError(`Invalid Jalaali year ${e}: must be a finite number between ${n} and ${r} (inclusive)`);
	let i = e + 621, a = -14, o = t[0], s = 0, c = 0;
	for (let n = 1; n < t.length && (s = t[n], c = s - o, !(e < s)); n += 1) a = a + _(c, 33) * 8 + _(v(c, 33), 4), o = s;
	let l = e - o;
	a = a + _(l, 33) * 8 + _(v(l, 33) + 3, 4), v(c, 33) === 4 && c - l === 4 && (a += 1);
	let u = _(i, 4) - _((_(i, 100) + 1) * 3, 4) - 150;
	return {
		gy: i,
		march: 20 + a - u,
		jump: c,
		n: l
	};
}
function h(e, t) {
	let n = t;
	e - t < 6 && (n = t - e + _(e + 4, 33) * 33);
	let r = v(v(n + 1, 33) - 1, 4);
	return r === -1 && (r = 4), r;
}
function g(e) {
	if (!Number.isFinite(e) || e < n || e > r) throw RangeError(`Invalid Jalaali year ${e}: must be a finite number between ${n} and ${r} (inclusive)`);
	let i = t[0], a = 0, o = 0;
	for (let n = 1; n < t.length && (a = t[n], o = a - i, !(e < a)); n += 1) i = a;
	return h(o, e - i);
}
function _(e, t) {
	return ~~(e / t);
}
function v(e, t) {
	return e - ~~(e / t) * t;
}
//#endregion
//#region src/core/Jalali.js
var y = class {
	getMonthLength(e, t) {
		return s(e, t + 1);
	}
	isLeap(e) {
		return o(e);
	}
	getFirstWeekDay(e, t) {
		let n = a(e, t + 1, 1);
		return (new Date(n.gy, n.gm - 1, n.gd).getDay() + 1) % 7;
	}
	today() {
		let e = /* @__PURE__ */ new Date(), t = i(e.getFullYear(), e.getMonth() + 1, e.getDate());
		return {
			year: t.jy,
			month: t.jm - 1,
			day: t.jd
		};
	}
	getWeekDay(e, t, n) {
		let r = a(e, t + 1, n);
		return (new Date(r.gy, r.gm - 1, r.gd).getDay() + 1) % 7;
	}
}, b = class {
	constructor() {
		this.jalali = new y();
	}
	getMonth(e, t) {
		let n = this.jalali.getMonthLength(e, t), r = [], i = this.jalali.getFirstWeekDay(e, t);
		for (let e = 0; e < i; e++) r.push({
			day: null,
			current: !1
		});
		for (let i = 1; i <= n; i++) r.push({
			day: i,
			month: t,
			year: e,
			current: !0,
			weekDay: this.getWeekDay(e, t, i)
		});
		for (; r.length < 42;) r.push({
			day: null,
			current: !1
		});
		return r;
	}
	today() {
		return this.jalali.today();
	}
	compareDates(e, t) {
		return e.year === t.year ? e.month === t.month ? e.day - t.day : e.month - t.month : e.year - t.year;
	}
	isSameDate(e, t) {
		return e.year === t.year && e.month === t.month && e.day === t.day;
	}
	getWeekDay(e, t, n) {
		return this.jalali.getWeekDay(e, t, n);
	}
	getIranTime() {
		let e = /* @__PURE__ */ new Date(), t = new Intl.DateTimeFormat("en-US", {
			timeZone: "Asia/Tehran",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: !1
		}).formatToParts(e);
		return {
			hour: Number(t.find((e) => e.type === "hour").value),
			minute: Number(t.find((e) => e.type === "minute").value),
			second: Number(t.find((e) => e.type === "second").value)
		};
	}
}, x = {
	meeting: "🧡",
	birthday: "🎂",
	payment: "💰",
	note: "📌",
	warning: "⚠️",
	travel: "✈️",
	study: "📚",
	medical: "🩺",
	party: "🎉",
	important: "⭐"
};
//#endregion
//#region src/components/DaysView.js
function S(e, t) {
	let n = new b(), r = document.createElement("div");
	return r.className = "pdp-days", [
		"ش",
		"ی",
		"د",
		"س",
		"چ",
		"پ",
		"ج"
	].forEach((e) => {
		let t = document.createElement("div");
		t.className = "pdp-weekday", t.textContent = e, r.appendChild(t);
	}), n.getMonth(e.currentYear, e.currentMonth).forEach((i) => {
		let a = document.createElement("button");
		if (a.className = "pdp-day", e.rangeStart && i.day === e.rangeStart.day && i.month === e.rangeStart.month && i.year === e.rangeStart.year && a.classList.add(e.classes.rangeStart, e.classes.range), e.rangeEnd && i.day === e.rangeEnd.day && i.month === e.rangeEnd.month && i.year === e.rangeEnd.year && a.classList.add(e.classes.rangeEnd, e.classes.range), e.rangeStart && e.rangeEnd && n.compareDates(i, e.rangeStart) > 0 && n.compareDates(i, e.rangeEnd) < 0 && a.classList.add(e.classes.range), typeof e.dayClassName == "function") {
			let t = e.dayClassName(i);
			t && a.classList.add(t);
		}
		let o = !1;
		e.minDate && n.compareDates(i, e.minDate) < 0 && (o = !0), e.maxDate && n.compareDates(i, e.maxDate) > 0 && (o = !0), Array.isArray(e.disabledDates) && e.disabledDates.some((e) => n.isSameDate(i, e)) && (o = !0), typeof e.disabledDates == "function" && e.disabledDates(i) && (o = !0), o && (a.disabled = !0, a.classList.add(e.classes.disabled)), a.textContent = i.day ?? "", i.current || a.classList.add("empty"), i.current && !o && (a.classList.add(e.classes.hover), a.onclick = () => t.select(i)), e.multiple > 0 && e.selectedDates.some((e) => e.day === i.day && e.month === i.month && e.year === i.year) && a.classList.add(e.classes.selected), (e.multiple ?? 0) === 0 && e.selectedDate && e.selectedDate.day === i.day && e.selectedDate.month === i.month && e.selectedDate.year === i.year && a.classList.add(e.classes.selected), e.selectedDate === null && e.today && i.current && i.day === e.today.day && i.month === e.today.month && i.year === e.today.year && a.classList.add(e.classes.today), a.classList.contains(e.classes.selected) && a.classList.remove(e.classes.today);
		let s = `${i.year}-${String(i.month + 1).padStart(2, "0")}-${String(i.day).padStart(2, "0")}`, c = e.events[s];
		if (c) {
			let e = document.createElement("span");
			e.className = "pdp-event-marker", e.textContent = x[c.type], a.append(e);
			let t = document.createElement("div");
			t.className = "pdp-event-tooltip tolltip", t.textContent = c.title, i.weekDay === 0 ? t.classList.add("tooltip-left") : i.weekDay === 6 && t.classList.add("tooltip-right"), a.append(t);
		}
		if (i.month === 9 && (i.day === 18 || i.day === 19)) {
			let e = document.createElement("span");
			e.className = "pdp-black-heart", e.textContent = "🖤", a.append(e);
		}
		r.appendChild(a);
	}), r;
}
//#endregion
//#region src/core/State.js
var C = class {
	constructor() {
		this.currentYear = null, this.currentMonth = null, this.yearStart = this.currentYear - this.currentYear % 12, this.view = "days", this.today = null, this.selectedDay = null, this.selectedDate = null, this.isRange = !1, this.rangeStart = null, this.rangeEnd = null, this.multiple = 0, this.selectedDates = [], this.disabledDates = [], this.events = {}, this.footer = {
			today: !0,
			clear: !0,
			close: !0
		}, this.showTime = !1, this.showSeconds = !0, this.hourFormat = 24, this.hour = 0, this.minute = 0, this.second = 0, this.meridiem = "AM", this.minTime = null, this.maxTime = null, this.timeError = "", this.hourStep = 1, this.minuteStep = 1, this.secondStep = 1, this.classes = {
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
}, w = class {
	constructor(e) {
		this.root = e;
	}
	clear() {
		this.root.innerHTML = "";
	}
	render(...e) {
		this.clear(), e.forEach((e) => {
			this.root.appendChild(e);
		});
	}
}, T = [
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
function E(e, t) {
	let n = document.createElement("div");
	return n.className = "pdp-months", T.forEach((r, i) => {
		let a = document.createElement("button");
		a.className = "pdp-month-item", a.textContent = r, i === e.currentMonth && a.classList.add("active"), a.onclick = (e) => {
			e.stopPropagation(), t.selectMonth(i);
		}, n.appendChild(a);
	}), n;
}
//#endregion
//#region src/components/YearsView.js
function D(e, t) {
	let n = document.createElement("div");
	n.className = "pdp-years-wrapper";
	let r = document.createElement("button");
	r.className = "pdp-years-prev", r.innerHTML = "❮", r.onclick = () => t.prevYears();
	let i = document.createElement("div");
	i.className = "pdp-years";
	for (let n = 0; n < 12; n++) {
		let r = e.yearStart + n, a = document.createElement("button");
		a.className = "pdp-year-item", a.textContent = r, r === e.currentYear && a.classList.add("active"), a.onclick = (e) => {
			e.stopPropagation(), t.selectYear(r);
		}, i.appendChild(a);
	}
	let a = document.createElement("button");
	return a.className = "pdp-years-next", a.innerHTML = "❯", a.onclick = () => t.nextYears(), n.appendChild(r), n.appendChild(i), n.appendChild(a), n;
}
//#endregion
//#region src/core/Formatter.js
var O = class {
	constructor(e = "YYYY/MM/DD") {
		this.isValidFormat(e) || (console.warn(`[PersianDatePicker] Invalid format "${e}", using default format.`), e = "YYYY/MM/DD"), this.format = e;
	}
	formatDate(e, t = {}) {
		let n = (t.multiple ?? 0) > 0;
		if (!e) return "";
		let r = e.hour ?? 0, i = e.minute ?? 0, a = e.second ?? 0, o = t.meridiem ?? "AM", s = r % 12;
		s === 0 && (s = 12);
		let c = {
			YYYY: String(e.year),
			YY: String(e.year).slice(-2),
			MM: String(e.month + 1).padStart(2, "0"),
			M: String(e.month + 1),
			DD: String(e.day).padStart(2, "0"),
			D: String(e.day),
			HH: String(r).padStart(2, "0"),
			H: String(r),
			hh: String(s).padStart(2, "0"),
			h: String(s),
			mm: String(i).padStart(2, "0"),
			m: String(i),
			ss: String(a).padStart(2, "0"),
			s: String(a),
			A: o,
			a: o.toLowerCase()
		}, l = this.format;
		return (n || t.isRange) && (l = l.replace(/\s*(HH|H|hh|h):?(mm|m)?(?::?(ss|s)?)?\s*(A|a)?/g, "").trim()), Object.keys(c).sort((e, t) => t.length - e.length).forEach((e) => {
			l = l.replaceAll(e, c[e]);
		}), l;
	}
	parseDate(e) {
		if (typeof e != "string") return null;
		let t = this.getTokens(), n = e.match(/[A-Za-z]+|\d+/g) ?? [], r = {};
		t.forEach((e, t) => {
			r[e] = n[t];
		});
		let i = Number(r.HH ?? r.H ?? r.hh ?? r.h ?? 0), a = r.A ?? r.a;
		a?.toUpperCase() === "PM" && i < 12 && (i += 12), a?.toUpperCase() === "AM" && i === 12 && (i = 0);
		let o = {
			year: r.YYYY ? Number(r.YYYY) : Number(r.YY),
			month: Number(r.MM ?? r.M) - 1,
			day: Number(r.DD ?? r.D),
			hour: i,
			minute: Number(r.mm ?? r.m ?? 0),
			second: Number(r.ss ?? r.s ?? 0)
		};
		return this.isValidDate(o) ? o : null;
	}
	getTokens() {
		return this.format.match(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|A|a/g);
	}
	isValidDate(e) {
		return !(!e || !Number.isFinite(e.year) || !Number.isFinite(e.month) || !Number.isFinite(e.day) || e.month < 0 || e.month > 11 || e.day < 1 || e.day > 31 || e.hour < 0 || e.hour > 23 || e.minute < 0 || e.minute > 59 || e.second < 0 || e.second > 59);
	}
	isValidFormat(e) {
		let t = e.match(/[A-Za-z]+/g);
		if (!t) return !1;
		let n = [
			"YYYY",
			"YY",
			"MM",
			"M",
			"DD",
			"D",
			"HH",
			"H",
			"hh",
			"h",
			"mm",
			"m",
			"ss",
			"s",
			"A",
			"a"
		];
		return t.every((e) => n.includes(e));
	}
};
//#endregion
//#region src/components/Footer.js
function k(e, t, n) {
	let r = document.createElement("div");
	if (r.className = e.classes.footer, !e.footer) return r;
	if (e.footer.today) {
		let n = document.createElement("button");
		n.textContent = "امروز", n.className = e.classes.btnToday, n.onclick = t.today, r.appendChild(n);
	}
	if (e.footer.clear) {
		let n = document.createElement("button");
		n.textContent = "پاک کردن", n.className = e.classes.btnClear, n.onclick = t.clear, r.appendChild(n);
	}
	if (e.footer.close) {
		let n = document.createElement("button");
		n.textContent = "بستن", n.className = e.classes.btnClose, n.onclick = t.close, r.appendChild(n);
	}
	return r;
}
//#endregion
//#region src/utils/time.js
function A(e) {
	return `${String(e.hour ?? 0).padStart(2, "0")}:${String(e.minute ?? 0).padStart(2, "0")}:${String(e.second ?? 0).padStart(2, "0")}`;
}
//#endregion
//#region src/components/TimeView.js
function j(e, t, n) {
	let r = document.createElement("div");
	r.className = "pdp-time-container";
	let i = document.createElement("div");
	i.className = "pdp-time";
	function a(e, n, r, i, a) {
		let o = document.createElement("div");
		o.className = "pdp-time-spinner";
		let s = document.createElement("button");
		s.type = "button", s.innerHTML = "<svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\">\n                            <path d=\"M7 14L12 9L17 14\" stroke=\"currentColor\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                        </svg>\n                        ";
		let c = document.createElement("input");
		c.type = "number", c.readOnly = !0, c.min = n, c.max = r, c.value = String(e).padStart(2, "0");
		let l = document.createElement("button");
		l.type = "button", l.innerHTML = "\n                            <svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\">\n                                <path d=\"M7 10L12 15L17 10\" stroke=\"currentColor\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                            </svg>\n                            ";
		function u() {
			let e = Number(c.value);
			e + i <= r ? e += i : e = n, c.value = String(e).padStart(2, "0"), a(e), t.change();
		}
		function d() {
			let e = Number(c.value);
			e - i >= n ? e -= i : e = r, c.value = String(e).padStart(2, "0"), a(e), t.change();
		}
		let f = null, p = null;
		function m(e) {
			e.preventDefault(), e.stopPropagation(), u(), i === 1 && (clearTimeout(p), clearInterval(f), p = setTimeout(() => {
				f = setInterval(u, 300);
			}, 400));
		}
		function h() {
			clearTimeout(p), clearInterval(f), p = null, f = null;
		}
		s.addEventListener("mousedown", m), document.addEventListener("mouseup", h), s.addEventListener("mouseleave", h);
		function g(e) {
			e.preventDefault(), e.stopPropagation(), d(), i === 1 && (clearTimeout(p), clearInterval(f), p = setTimeout(() => {
				f = setInterval(d, 200);
			}, 400));
		}
		function _() {
			clearTimeout(p), clearInterval(f), p = null, f = null;
		}
		return l.addEventListener("mousedown", g), document.addEventListener("mouseup", _), l.addEventListener("mouseleave", _), o.onwheel = (e) => {
			e.preventDefault(), e.deltaY < 0 ? u() : d();
		}, o.append(s), o.append(c), o.append(l), o;
	}
	let o = a(e.hour, e.hourFormat === 24 ? 0 : 1, e.hourFormat === 24 ? 23 : 12, n.hourStep ?? 1, (t) => e.hour = t), s = a(e.minute, 0, 59, n.minuteStep ?? 1, (t) => e.minute = t);
	i.append(o);
	let c = document.createElement("span");
	if (c.textContent = ":", i.append(c), i.append(s), e.showSeconds) {
		let t = document.createElement("span");
		t.textContent = ":", i.append(t);
		let r = a(e.second, 0, 59, n.secondStep ?? 1, (t) => e.second = t);
		i.append(r);
	}
	if (e.hourFormat === 12) {
		let n = document.createElement("select");
		["AM", "PM"].forEach((e) => {
			let t = document.createElement("option");
			t.value = e, t.textContent = e, n.append(t);
		}), n.value = e.meridiem, n.onchange = () => {
			e.meridiem = n.value, t.change();
		}, i.append(n);
	}
	r.append(i);
	let l = document.createElement("div");
	if (l.className = "pdp-time-messages", e.minTime || e.maxTime) {
		let t = document.createElement("div");
		t.className = e.classes.textInfo, e.minTime && e.maxTime ? t.textContent = `محدوده مجاز: ${A(e.minTime)} تا ${A(e.maxTime)}` : e.minTime ? t.textContent = `حداقل زمان مجاز: ${A(e.minTime)}` : t.textContent = `حداکثر زمان مجاز: ${A(e.maxTime)}`, l.append(t);
	}
	let u = document.createElement("div");
	if (u.className = "pdp-time-messages", (e.multiple ?? 0) > 1) {
		let t = document.createElement("div");
		t.className = e.classes.textCountSelect, t.textContent = `تعداد مجاز انتخاب: ${e.multiple ?? 1}`, u.append(t);
	}
	if (e.timeError) {
		let t = document.createElement("div");
		t.className = e.classes.textError, t.textContent = e.timeError, l.append(t);
	}
	return r.append(l), r.append(u), r;
}
//#endregion
//#region src/core/StateFactory.js
function M(e, t) {
	let n = new C();
	return e.classes && typeof e.classes == "object" && !Array.isArray(e.classes) && (n.classes = {
		...n.classes,
		...e.classes || {}
	}), e.footer && typeof e.footer == "object" && !Array.isArray(e.footer) && (n.footer = {
		...n.footer,
		...e.footer ?? {}
	}), n.isRange = typeof e.range == "boolean" ? e.range : n.isRange, n.multiple = typeof e.multiple == "number" ? e.multiple : n.multiple, n.minDate = N(e.minDate, t), n.maxDate = N(e.maxDate, t), typeof e.disabledDates == "function" ? n.disabledDates = e.disabledDates : Array.isArray(e.disabledDates) ? n.disabledDates = Array.isArray(e.disabledDates) ? e.disabledDates.filter((e) => typeof e == "string").map((e) => t.parseDate(e)).filter((e) => e && Number.isInteger(e.year) && Number.isInteger(e.month) && Number.isInteger(e.day)) : [] : n.disabledDates = [], n.selectedDate = N(e.defaultDate, t), n.selectedDate && (n.currentYear = n.selectedDate.year, n.currentMonth = n.selectedDate.month), n.dayClassName = typeof e.dayClassName == "function" ? e.dayClassName : null, n.showTime = typeof e.time == "boolean" ? e.time : !1, n.hourFormat = typeof e.hourFormat == "number" ? e.hourFormat : 24, n.showSeconds = typeof e.showSeconds == "boolean" ? e.showSeconds : !0, n.minuteStep = typeof e.minuteStep == "number" ? e.minuteStep : 1, n.hourStep = typeof e.hourStep == "number" ? e.hourStep : 1, n.secondStep = typeof e.secondStep == "number" ? e.secondStep : 1, n.minTime = P(e.minTime), n.maxTime = P(e.maxTime), e.events && typeof e.events == "object" && !Array.isArray(e.events) && (n.events = {}, Object.entries(e.events).forEach(([e, r]) => {
		let i = t.parseDate(e);
		if (!i) return;
		let a = `${i.year}-${String(i.month + 1).padStart(2, "0")}-${String(i.day).padStart(2, "0")}`;
		n.events[a] = r;
	})), n.showTime && (n.isRange || (n.multiple ?? 0) > 0) && (console.warn("[PersianDatePicker] 'time' cannot be used with 'range' or 'multiple'. Time has been disabled."), n.showTime = !1), n;
}
function N(e, t) {
	if (typeof e != "string") return null;
	let n = t.parseDate(e);
	return Number.isNaN(n.year) || Number.isNaN(n.month) || Number.isNaN(n.day) ? (console.warn(`[PersianDatePicker] Invalid date "${e}".`), null) : n;
}
function P(e) {
	if (typeof e != "string") return null;
	let t = e.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
	if (!t) return console.warn(`[PersianDatePicker] Invalid time "${e}".`), null;
	let n = Number(t[1]), r = Number(t[2]), i = Number(t[3] ?? 0);
	return n > 23 || r > 59 || i > 59 ? (console.warn(`[PersianDatePicker] Invalid time "${e}".`), null) : {
		hour: n,
		minute: r,
		second: i
	};
}
//#endregion
//#region src/core/OptionValidator.js
function F(e = {}, t = {}) {
	return e.classes !== void 0 && (typeof e.classes != "object" || Array.isArray(e.classes)) && (console.warn("[PersianDatePicker] 'classes' must be an object."), e.classes = {}), e.footer !== void 0 && (typeof e.footer != "object" || Array.isArray(e.footer)) && (console.warn("[PersianDatePicker] 'footer' must be an object."), e.footer = {}), e.range !== void 0 && typeof e.range != "boolean" && (console.warn("[PersianDatePicker] 'range' must be a boolean."), e.range = !1), e.multiple !== void 0 && typeof e.multiple != "number" && (console.warn("[PersianDatePicker] 'multiple' must be a number."), e.multiple = 0), e.dayClassName !== void 0 && typeof e.dayClassName != "function" && (console.warn("[PersianDatePicker] 'dayClassName' must be a function."), e.dayClassName = null), e.time !== void 0 && typeof e.time != "boolean" && (console.warn("[PersianDatePicker] 'time' must be a boolean."), e.time = !1), e.hourFormat !== void 0 && ![12, 24].includes(e.hourFormat) && (console.warn("[PersianDatePicker] 'hourFormat' must be 12 or 24."), e.hourFormat = 24), e.showSeconds !== void 0 && typeof e.showSeconds != "boolean" && (console.warn("[PersianDatePicker] 'showSeconds' must be a boolean."), e.showSeconds = !1), [
		"hourStep",
		"minuteStep",
		"secondStep"
	].forEach((t) => {
		e[t] !== void 0 && typeof e[t] != "number" && (console.warn(`[PersianDatePicker] '${t}' must be a number.`), e[t] = 1);
	}), [
		"minDate",
		"maxDate",
		"defaultDate"
	].forEach((t) => {
		e[t] !== void 0 && typeof e[t] != "string" && (console.warn(`[PersianDatePicker] '${t}' must be a string.`), e[t] = null), e[t] !== void 0 && (n(e[t]) || (console.warn(`[PersianDatePicker] '${t}' invalid format. Use YYYY/MM/DD`), e[t] = null));
	}), e.disabledDates !== void 0 && !Array.isArray(e.disabledDates) && typeof e.disabledDates != "function" && (console.warn("[PersianDatePicker] 'disabledDates' must be an array or function."), e.disabledDates = []), e.events !== void 0 && (typeof e.events != "object" || Array.isArray(e.events)) && (console.warn("[PersianDatePicker] 'events' must be an object."), e.events = {}), e;
	function n(e) {
		if (typeof e != "string") return !1;
		let t = e.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
		if (!t) return !1;
		let [n, r, i, a] = t.map(Number);
		return !(i < 1 || i > 12 || a < 1 || a > 31);
	}
}
//#endregion
//#region src/index.js
var I = class {
	constructor(e = {}) {
		if (this.options = e, this.formatter = new O(this.options.format ?? "YYYY/MM/DD"), this.options = F(e, this.state), this.state = M(this.options, this.formatter), this.options.time) {
			let e = /(HH|H|hh|h)/.test(this.formatter.format), t = /(mm|m)/.test(this.formatter.format), n = /(ss|s)/.test(this.formatter.format), r = /(A|a)/.test(this.formatter.format);
			(!e || !t) && (this.formatter.format += " HH:mm"), this.state.showSeconds && !n && (this.formatter.format += ":ss"), this.state.hourFormat === 12 && !r && (this.formatter.format += " A");
		}
		if (this.input = document.querySelector(e.element), !this.input) throw Error("Input not found.");
		this.onInputClick = () => this.open(), this.input.addEventListener("click", this.onInputClick), this.onDocumentClick = (e) => {
			!this.state.isRange && (this.state.multiple ?? 0) === 0 && !this.container.contains(e.target) && e.target !== this.input && this.close();
		}, document.addEventListener("click", this.onDocumentClick), this.onThemeChange = (e) => {
			if (t.month === 9 && (t.day === 18 || t.day === 19)) {
				this.setTheme("dark");
				return;
			}
			this.setTheme(e.detail?.theme ?? "light");
		}, document.addEventListener("pdp:theme", this.onThemeChange), this.calendar = new b();
		let t = this.calendar.today();
		this.state.today = t;
		let n = this.calendar.getIranTime();
		this.state.hour = n.hour, this.state.minute = n.minute, this.state.second = n.second, this.state.selectedDate || (this.state.currentYear = t.year, this.state.currentMonth = t.month), this.container = document.createElement("div"), this.container.className = "pdp";
		let r = this.input.getAttribute("theme") || "light";
		this.container.classList.add(`pdp-${r}`), document.body.appendChild(this.container), this.state.selectedDate && (this.input.value = this.formatter.formatDate(this.state.selectedDate, this.state)), this.renderer = new w(this.container), this.render();
	}
	render() {
		let t = document.createElement("div");
		t.className = this.state.classes.body, this.state.view === "days" && t.appendChild(S(this.state, { select: (e) => this.selectDate(e) })), this.state.showTime && this.state.view === "days" && t.appendChild(j(this.state, { change: () => this.changeTime() }, this.options)), this.state.view === "months" && t.appendChild(E(this.state, { selectMonth: (e) => this.selectMonth(e) })), this.state.view === "years" && t.appendChild(D(this.state, {
			selectYear: (e) => this.selectYear(e),
			prevYears: () => this.prevYears(),
			nextYears: () => this.nextYears()
		})), this.renderer.render(e(this.state, {
			prevMonth: () => {
				this.state.view === "years" ? this.prevYears() : this.prevMonth();
			},
			nextMonth: () => {
				this.state.view === "years" ? this.nextYears() : this.nextMonth();
			},
			showMonths: () => this.showMonths(),
			showYears: () => this.showYears()
		}, this.options), t, k(this.state, {
			today: () => this.goToday(),
			clear: () => this.clear(),
			close: () => this.close()
		}, this.options));
	}
	prevMonth() {
		this.state.currentMonth--, this.state.currentMonth < 0 && (this.state.currentMonth = 11, this.state.currentYear--), this.refresh();
	}
	nextMonth() {
		this.state.currentMonth++, this.state.currentMonth > 11 && (this.state.currentMonth = 0, this.state.currentYear++), this.refresh();
	}
	refresh() {
		this.render();
	}
	selectDate(e) {
		if (this.state.multiple > 0) {
			let t = this.state.selectedDates.findIndex((t) => t.year === e.year && t.month === e.month && t.day === e.day);
			if (t !== -1) this.state.selectedDates.splice(t, 1);
			else {
				if (this.state.selectedDates.length >= this.state.multiple) return;
				this.state.selectedDates.push({
					...e,
					hour: this.state.hour,
					minute: this.state.minute,
					second: this.state.second
				});
			}
			this.input.value = this.state.selectedDates.map((e) => this.formatter.formatDate(e, this.state)).join(" , "), this.render();
			return;
		}
		if (!this.state.isRange) {
			if (this.state.selectedDate = {
				...e,
				hour: this.state.hour,
				minute: this.state.minute,
				second: this.state.second
			}, this.state.timeError) return;
			typeof this.options.onSelect == "function" && this.options.onSelect(this.getDate()), this.state.currentYear = e.year, this.state.currentMonth = e.month, this.input.value = this.formatter.formatDate(this.state.selectedDate, this.state), this.render(), this.close();
			return;
		}
		if (!this.state.rangeStart) {
			this.state.rangeStart = {
				...e,
				hour: this.state.hour,
				minute: this.state.minute,
				second: this.state.second
			}, this.input.value = this.formatter.formatDate(this.state.rangeStart, this.state), this.render();
			return;
		} else if (this.state.rangeEnd) this.state.rangeStart = e, this.state.rangeEnd = null, this.render();
		else {
			if (this.state.rangeEnd = {
				...e,
				hour: this.state.hour,
				minute: this.state.minute,
				second: this.state.second
			}, this.calendar.compareDates(this.state.rangeStart, this.state.rangeEnd) > 0) {
				let e = this.state.rangeStart;
				this.state.rangeStart = this.state.rangeEnd, this.state.rangeEnd = e;
			}
			this.input.value = this.formatter.formatDate(this.state.rangeStart, this.state) + " - " + this.formatter.formatDate(this.state.rangeEnd, this.state), this.render();
			return;
		}
		this.render();
	}
	showMonths() {
		this.state.view = "months", this.render();
	}
	showDays() {
		this.state.view = "days", this.render();
	}
	selectMonth(e) {
		this.state.currentMonth = e, this.showDays();
	}
	showYears() {
		this.state.view = "years", this.state.yearStart = this.state.currentYear - this.state.currentYear % 12, this.render();
	}
	selectYear(e) {
		this.state.currentYear = e, this.showMonths();
	}
	prevYears() {
		this.state.yearStart -= 12, this.render();
	}
	nextYears() {
		this.state.yearStart += 12, this.render();
	}
	open() {
		this.applyTheme(), this.validateTime();
		let e = this.input.getBoundingClientRect();
		this.container.style.top = e.bottom + window.scrollY + 8 + "px", this.container.style.right = `${window.innerWidth - e.right}px`, this.container.style.left = "auto", this.container.style.display = "block", typeof this.options.onOpen == "function" && this.options.onOpen(), this.render();
	}
	close() {
		this.container.style.display = "none", typeof this.options.onClose == "function" && this.options.onClose();
	}
	goToday() {
		let e = this.calendar.today();
		this.state.currentYear = e.year, this.state.currentMonth = e.month, this.selectDate(e);
	}
	clear() {
		this.state.selectedDate = null, this.state.rangeStart = null, this.state.rangeEnd = null, this.input.value = "", this.render();
	}
	getDate() {
		return this.state.isRange ? {
			start: this.state.rangeStart ? this.formatter.formatDate(this.state.rangeStart, this.state) : null,
			end: this.state.rangeEnd ? this.formatter.formatDate(this.state.rangeEnd, this.state) : null
		} : this.state.multiple > 0 ? this.state.selectedDates.map((e) => this.formatter.formatDate(e, this.state, !0)) : this.state.selectedDate ? this.formatter.formatDate(this.state.selectedDate, this.state) : null;
	}
	setDate(e) {
		if (!this.state.isRange) {
			let t = this.formatter.parseDate(e);
			this.state.selectedDate = t, this.state.currentYear = t.year, this.state.currentMonth = t.month, this.input.value = this.formatter.formatDate(t, this.state), this.render();
			return;
		}
		if (!e.start || !e.end) {
			console.log("لطفاً تاریخ دوم را نیز وارد کنید.");
			return;
		}
		this.state.rangeStart = this.formatter.parseDate(e.start), this.state.rangeEnd = this.formatter.parseDate(e.end), this.input.value = this.formatter.formatDate(this.state.rangeStart, this.state) + " - " + this.formatter.formatDate(this.state.rangeEnd, this.state), this.render();
	}
	destroy() {
		this.input.removeEventListener("click", this.onInputClick), document.removeEventListener("click", this.onDocumentClick), document.removeEventListener("pdp:theme", this.onThemeChange), this.container.remove();
	}
	changeTime() {
		if (!this.state.isRange && !this.state.selectedDate) {
			let e = this.calendar.today();
			this.state.selectedDate = {
				year: e.year,
				month: e.month,
				day: e.day,
				hour: this.state.hour,
				minute: this.state.minute,
				second: this.state.second
			};
		}
		if (!this.state.isRange && this.state.selectedDate && (this.state.selectedDate.hour = this.state.hour, this.state.selectedDate.minute = this.state.minute, this.state.selectedDate.second = this.state.second), this.state.isRange && (this.state.rangeStart && !this.state.rangeEnd && (this.state.rangeStart.hour = this.state.hour, this.state.rangeStart.minute = this.state.minute, this.state.rangeStart.second = this.state.second), this.state.rangeEnd && (this.state.rangeEnd.hour = this.state.hour, this.state.rangeEnd.minute = this.state.minute, this.state.rangeEnd.second = this.state.second)), this.validateTime(), !this.state.isRange && this.state.selectedDate && (this.state.selectedDate.hour = this.state.hour, this.state.selectedDate.minute = this.state.minute, this.state.selectedDate.second = this.state.second), this.state.isRange && (this.state.rangeStart && (this.state.rangeStart.hour = this.state.hour, this.state.rangeStart.minute = this.state.minute, this.state.rangeStart.second = this.state.second), this.state.rangeEnd && (this.state.rangeEnd.hour = this.state.hour, this.state.rangeEnd.minute = this.state.minute, this.state.rangeEnd.second = this.state.second)), this.state.timeError) {
			this.render();
			return;
		}
		let e = this.state.isRange ? this.state.rangeStart ? this.formatter.formatDate(this.state.rangeStart, this.state) + (this.state.rangeEnd ? " - " + this.formatter.formatDate(this.state.rangeEnd, this.state) : "") : "" : this.state.selectedDate ? this.formatter.formatDate(this.state.selectedDate, this.state) : "";
		this.input.value = e, this.render();
	}
	parseTime(e) {
		let t = e.split(":");
		return {
			hour: Number(t[0]),
			minute: Number(t[1]),
			second: Number(t[2] ?? 0)
		};
	}
	compareTime(e, t) {
		return e.hour === t.hour ? e.minute === t.minute ? e.second - t.second : e.minute - t.minute : e.hour - t.hour;
	}
	pad(e) {
		return String(e).padStart(2, "0");
	}
	validateTime() {
		let e = {
			hour: this.state.hour,
			minute: this.state.minute,
			second: this.state.second
		};
		if (this.state.timeError = "", this.options.minTime) {
			let t = this.parseTime(this.options.minTime);
			this.compareTime(e, t) < 0 && (this.state.timeError = `حداقل زمان ${this.options.minTime} است.`);
		}
		if (!this.state.timeError && this.options.maxTime) {
			let t = this.parseTime(this.options.maxTime);
			this.compareTime(e, t) > 0 && (this.state.timeError = `حداکثر زمان ${A(this.state.maxTime)} است.`);
		}
	}
	applyTheme() {
		let e = new b().today(), t = this.input.getAttribute("theme") || "light";
		e.month === 9 && (e.day === 18 || e.day === 19) && (console.info("🖤In memory of our young people, the calendar will be displayed in 'dark mode' on the 18th and 19th of Dey."), t = "dark"), t === "auto" && (t = document.documentElement.getAttribute("theme") || "light"), this.container.classList.remove("pdp-light", "pdp-dark"), this.container.classList.add(`pdp-${t}`);
	}
	setTheme(e) {
		return [
			"light",
			"dark",
			"auto"
		].includes(e) ? (this.input.setAttribute("theme", e), this.applyTheme(), !0) : !1;
	}
};
//#endregion
export { I as default };
