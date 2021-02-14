import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState, createContext, useContext } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function SvgAngleDownIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { className: "angle-down-icon_svg__st0", d: "M26 12l-10 8-10-8" }, void 0) }), void 0));
}

function SvgAngleLeftIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { className: "angle-left-icon_svg__st0", d: "M20 26l-8-10 8-10" }, void 0) }), void 0));
}

function SvgAngleRightIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { d: "M12 6l8 10-8 10" }, void 0) }), void 0));
}

function SvgAngleUpIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { d: "M6 20l10-8 10 8" }, void 0) }), void 0));
}

function SvgCheckIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { d: "M20 6L9 17l-5-5" }, void 0) }), void 0));
}

function SvgCircleIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("circle", { cx: 16, cy: 16, r: 10 }, void 0) }), void 0));
}

function SvgCrossIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { d: "M6 6l20 20M26 6L6 26" }, void 0) }), void 0));
}

function SvgEditIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { d: "M16 26h10.5M21.3 6.7c1-1 2.5-1 3.5 0s1 2.5 0 3.5L10.2 24.8 5.5 26l1.2-4.7L21.3 6.7z" }, void 0) }), void 0));
}

function SvgHamburgerIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { className: "hamburger-icon_svg__st0", d: "M24 10H8c-1.1 0-2-.9-2-2v0c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2zM24 18H8c-1.1 0-2-.9-2-2v0c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2zM24 26H8c-1.1 0-2-.9-2-2v0c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2z" }, void 0) }), void 0));
}

function SvgNimboxIcon(props) {
    return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 216.833 227.492" }, props, { children: [jsx("path", { fill: "#F7CE3C", d: "M42.111 98.075l66.325-6.472v15.281z" }, void 0),
            jsx("path", { fill: "#FFE6A2", d: "M174.76 98.075l-66.324-6.472v15.281z" }, void 0),
            jsx("path", { fill: "#00607F", d: "M108.436 206.377v-99.945l-66.325-8.357v84.979z" }, void 0),
            jsx("path", { fill: "#4EC1E0", d: "M85.836 138.691l-64.721-14.778L42.048 98.09l65.277 8.202z" }, void 0),
            jsx("path", { fill: "#FF4C00", d: "M108.396 206.377v-99.945l66.364-8.357-.038 84.979z" }, void 0),
            jsx("path", { fill: "#FFA400", d: "M130.995 138.691l64.722-14.778-20.935-25.823-65.278 8.202z" }, void 0),
            jsx("g", __assign({ fill: "#FFA400" }, { children: jsx("path", { d: "M111.659 80.687l6.629-59.572H98.543l6.632 59.572c1.07-.032 2.148-.055 3.239-.055 1.094 0 2.172.022 3.245.055zM162.059 53.946l-12.275-7.089-15.302 37.132c1.542.471 2.991.979 4.343 1.526l23.234-31.569zM67.049 46.857l-12.277 7.089 23.234 31.569a52.461 52.461 0 014.344-1.526L67.049 46.857z" }, void 0) }), void 0)] }), void 0));
}

function SvgSearchIcon(props) {
    return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: [jsx("circle", { cx: 14.5, cy: 14.5, r: 8.5 }, void 0),
            jsx("path", { d: "M26 26l-5.5-5.5" }, void 0)] }), void 0));
}

function SvgSpeechBubbleIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { d: "M16 6C9.4 6 4 9.6 4 14c0 2.1 1.2 4 3.2 5.4l-1.8 5.8 8.1-3.4c.8.1 1.6.2 2.5.2 6.6 0 12-3.6 12-8s-5.4-8-12-8z" }, void 0) }), void 0));
}

function SvgSquareIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { className: "square-icon_svg__st0", d: "M6 6h20v20H6z" }, void 0) }), void 0));
}

function SvgThumbTackIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { d: "M16 20v6M17.9 7.4l1.4 8.2c2.5.7 4.4 2.3 4.7 4.3h-4l-8 .1H8c.4-2 2.3-3.6 4.7-4.3l1.4-8.2s-1.3-.7-1.3-.9v-.2c0-.2.3-.3.5-.3h5.2c.3-.1.5.1.5.2v.2c.2.2-1.1.9-1.1.9z" }, void 0) }), void 0));
}

function SvgThumbsUpIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { d: "M18.1 13V9c0-1.7-1.3-3-3-3l-4 9v11h11.3c1 0 1.8-.7 2-1.7l1.4-9c.2-1.1-.6-2.1-1.7-2.3h-6zm-6.9 13h-3c-1.1 0-2-.9-2-2v-7c0-1.1.9-2 2-2h3" }, void 0) }), void 0));
}

function SvgWaffleIcon(props) {
    return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: [jsx("circle", { cx: 8, cy: 8, r: 2 }, void 0),
            jsx("circle", { cx: 16, cy: 8, r: 2 }, void 0),
            jsx("circle", { cx: 24, cy: 8, r: 2 }, void 0),
            jsx("circle", { cx: 8, cy: 16, r: 2 }, void 0),
            jsx("circle", { cx: 16, cy: 16, r: 2 }, void 0),
            jsx("circle", { cx: 24, cy: 16, r: 2 }, void 0),
            jsx("circle", { cx: 8, cy: 24, r: 2 }, void 0),
            jsx("circle", { cx: 16, cy: 24, r: 2 }, void 0),
            jsx("circle", { cx: 24, cy: 24, r: 2 }, void 0)] }), void 0));
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AngleDownIcon: SvgAngleDownIcon,
    AngleLeftIcon: SvgAngleLeftIcon,
    AngleRightIcon: SvgAngleRightIcon,
    AngleUpIcon: SvgAngleUpIcon,
    CheckIcon: SvgCheckIcon,
    CircleIcon: SvgCircleIcon,
    CrossIcon: SvgCrossIcon,
    EditIcon: SvgEditIcon,
    HamburgerIcon: SvgHamburgerIcon,
    NimboxIcon: SvgNimboxIcon,
    SearchIcon: SvgSearchIcon,
    SpeechBubbleIcon: SvgSpeechBubbleIcon,
    SquareIcon: SvgSquareIcon,
    ThumbTackIcon: SvgThumbTackIcon,
    ThumbsUpIcon: SvgThumbsUpIcon,
    WaffleIcon: SvgWaffleIcon
});

var Button = function (_a) {
    var _b = _a.link, link = _b === void 0 ? false : _b, _c = _a.secondary, secondary = _c === void 0 ? false : _c, _d = _a.size, size = _d === void 0 ? 'base' : _d, children = _a.children, className = _a.className, props = __rest(_a, ["link", "secondary", "size", "children", "className"]);
    return link ?
        (jsx("button", __assign({}, props, { className: classnames({
                'text-xs': size === 'sm',
                '': size === 'base',
                'text-xl': size === 'lg'
            }, {
                'text-primary-500 hover:text-primary-700': !secondary,
                'text-gray-500 hover:text-gray-700': secondary
            }, ' hover:underline rounded cursor-pointer focus:outline-none', className) }, { children: children }), void 0))
        :
            (jsx("button", __assign({}, props, { className: classnames({
                    'px-2 py-0 text-xs': size === 'sm',
                    'px-4 py-2': size === 'base',
                    'px-4 py-2 text-xl': size === 'lg'
                }, {
                    'text-white font-bold bg-primary-500 hover:bg-primary-700 border border-primary-600 hover:border-primary-700': !secondary,
                    'text-primary-500 hover:text-white font-bold bg-transparent hover:bg-primary-700 border border-primary-600 hover:border-primary-700': secondary
                }, 'rounded focus:outline-none', className) }, { children: children }), void 0));
};
var MoreOptionsButton = function (_a) {
    var _b = _a.value, value = _b === void 0 ? false : _b, onChange = _a.onChange; _a.className; var children = _a.children, props = __rest(_a, ["value", "onChange", "className", "children"]);
    var t = useTranslation().t;
    return (jsxs(Fragment, { children: [jsxs(Button, __assign({ link: true, onClick: function () { return onChange(!value); } }, props, { children: [jsx(SvgAngleRightIcon, { className: classnames('inline w-4 h-4 mr-1 stroke-current stroke-2 transform', { 'rotate-90': value }, 'transition duration-150 ease-in-out transtition-transform') }, void 0), !value ? t('more-options') : t('less-options')] }), void 0), value && children] }, void 0));
};

var Card = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('bg-content-fg border border-content-border rounded', className) }, { children: children }), void 0));
};
Card.Header = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('border-b border-content-border p-3', className) }, { children: children }), void 0));
};
Card.Body = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('p-3', className) }, { children: children }), void 0));
};
Card.Footer = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('border-t border-content-border p-3', className) }, { children: children }), void 0));
};

var useShower = function (onClickOutside) {
    var target = useRef(null);
    var popper = useRef(null);
    var handleDocumentClick = function (event) {
        if (popper.current && !popper.current.contains(event.target)) {
            if (target.current && !target.current.contains(event.target)) {
                onClickOutside();
            }
        }
    };
    useEffect(function () {
        document.addEventListener("mousedown", handleDocumentClick);
        return function () {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    });
    return [target, popper];
};

// constants
var namedDays = [
    { label: 'tomorrow', date: function (t) { t.setDate(t.getDate() + 1); return t; } },
    { label: 'day-after-tomorrow', date: function (t) { t.setDate(t.getDate() + 2); return t; } },
    { label: 'this-friday', date: function (t) { t.setDate(t.getDate() + 5 - t.getDay()); return t; } },
    { label: 'next-monday', date: function (t) { t.setDate(t.getDate() + 8 - t.getDay()); return t; } },
    { label: 'next-friday', date: function (t) { t.setDate(t.getDate() + 8 + 4 - t.getDay()); return t; } },
    { label: 'in-two-weeks', date: function (t) { t.setDate(t.getDate() + 15 - t.getDay()); return t; } },
    { label: 'next-month', date: function (t) { t.setDate(1); t.setMonth(t.getMonth() + 1); if (t.getDay() === 6) {
            t.setDate(t.getDate() + 2);
        } if (t.getDay() === 0) {
            t.setDate(t.getDate() + 1);
        } return t; } },
    { label: 'in-two-months', date: function (t) { t.setDate(1); t.setMonth(t.getMonth() + 2); if (t.getDay() === 6) {
            t.setDate(t.getDate() + 2);
        } if (t.getDay() === 0) {
            t.setDate(t.getDate() + 1);
        } return t; } }
];
/**
 * DatePicker. Select a date with one click.
 */
var DatePicker = function (_a) {
    var name = _a.name, value = _a.value, onChange = _a.onChange, shortcuts = _a.shortcuts, placeholder = _a.placeholder;
    var _b = useTranslation(), t = _b.t, ready = _b.ready;
    var _c = useState(firstDate(value)), calendar = _c[0], setCalendar = _c[1];
    useEffect(function () { return setCalendar(firstDate(value)); }, [value]);
    var _d = useState(false), show = _d[0], setShow = _d[1];
    var _e = useShower(function () { return setShow(false); }), valueRef = _e[0], popperRef = _e[1];
    // handlers
    var handleShow = function () { if (!show) {
        setShow(true);
    } };
    var handleHide = function () { if (show) {
        setShow(false);
    } };
    var handleFocus = handleShow;
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 9: // tab
            case 13: // enter
                var ymd = parseDate(value);
                if (ymd) {
                    handleFinalChange(ymd);
                }
                handleHide();
                break;
            default:
                handleShow();
        }
    };
    var handleChange = function (e) {
        onChange({ target: { name: name, value: e.target.value.replace(/[^0-9-]/g, '') } });
    };
    var handleFinalChange = function (ymd) {
        var value = formatDate(ymd);
        onChange({ target: { name: name, value: value } });
        handleHide();
    };
    // navigation
    var handleClickPrevMonth = function () {
        var c = new Date(calendar);
        c.setMonth(c.getMonth() - 1);
        setCalendar(c);
    };
    var handleClickToday = function () {
        var c = new Date();
        c.setHours(12, 0, 0, 0);
        setCalendar(c);
    };
    var handleClickNextMonth = function () {
        var c = new Date(calendar);
        c.setMonth(c.getMonth() + 1);
        setCalendar(c);
    };
    var handleClickDate = function (d) {
        handleFinalChange([d.getFullYear(), d.getMonth(), d.getDate()]);
        handleHide();
    };
    // setup
    var today = new Date();
    today.setHours(12, 0, 0, 0);
    var v = parseDate(value);
    var selected = v ? new Date(v[0], v[1], v[2], 12, 0, 0, 0) : null;
    // calculate
    var d = new Date(calendar.getTime());
    d.setDate(1 - d.getDay()); // beginning of week containing beginning of month
    var weeks = [];
    for (var i = 0; i < 6; i++) {
        var dates = [];
        for (var j = 0; j < 7; j++, d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d.getTime()));
        }
        weeks.push(dates);
    }
    // format
    function dayClasses(d) {
        var c = ['hover:text-white hover:bg-secondary-500'];
        if (d.getMonth() !== calendar.getMonth()) {
            c.push('text-muted bg-gray-200');
        } // off
        if (d.getTime() === today.getTime()) {
            c.push('text-white bg-info-500');
        } // today
        if (selected && d.getTime() === selected.getTime()) {
            c.push('text-white bg-primary-500');
        } //selected
        return c.join(' ');
    }
    // render
    var months = ready ? t('months', { returnObjects: true }) : null;
    var days = ready ? t('shortDays', { returnObjects: true }) : null;
    return (jsxs("div", __assign({ className: "relative" }, { children: [jsx("div", __assign({ ref: valueRef }, { children: jsx("input", { name: name, value: value, onChange: handleChange, onFocus: handleFocus, onKeyDown: handleKeyDown, placeholder: placeholder, className: "w-full px-2 py-1 border border-content-border rounded" }, "input") }), void 0),
            ready && show &&
                jsx("div", __assign({ ref: popperRef, className: "absolute left-0 mt-1 bg-content-fg border border-conteng-border rounded overflow-hidden" }, { children: jsxs("div", __assign({ className: "flex flex-row" }, { children: [jsxs("div", { children: [jsxs("div", __assign({ className: "px-2 py-1 flex flex-row items-center justify-between bg-gray-400" }, { children: [jsxs("div", __assign({ className: "flex-grow text-center font-bold" }, { children: [months[calendar.getMonth()], " ", calendar.getFullYear()] }), void 0),
                                            jsxs("div", { children: [jsx("button", __assign({ className: "focus:outline-none", onClick: handleClickPrevMonth }, { children: jsx(SvgAngleLeftIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" }, void 0) }), void 0),
                                                    jsx("button", __assign({ className: "px-2 focus:outline-none", onClick: handleClickToday }, { children: jsx(SvgCircleIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" }, void 0) }), void 0),
                                                    jsx("button", __assign({ className: "focus:outline-none", onClick: handleClickNextMonth }, { children: jsx(SvgAngleRightIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" }, void 0) }), void 0)] }, void 0)] }), void 0),
                                    jsxs("table", __assign({ className: "table-fixed text-center" }, { children: [jsx("thead", { children: jsx("tr", { children: days.map(function (d, i) { return jsx("th", __assign({ className: "w-10 px-1" }, { children: d }), i); }) }, void 0) }, void 0),
                                            jsx("tbody", __assign({ className: "cursor-pointer" }, { children: weeks.map(function (w) {
                                                    return jsx("tr", { children: w.map(function (d) { return jsx("td", __assign({ onClick: function () { return handleClickDate(d); }, className: dayClasses(d) }, { children: d.getDate() }), d.getTime()); }) }, w[0].getTime());
                                                }) }), void 0)] }), void 0)] }, void 0),
                            shortcuts &&
                                jsx("div", __assign({ className: "flex flex-col justify-between bg-gray-300 cursor-pointer" }, { children: namedDays.map(function (s, i) { return jsx("div", __assign({ onClick: function () { return handleClickDate(s.date(new Date(today))); }, className: "px-2 hover:text-white hover:bg-secondary-500" }, { children: t("namedDays." + s.label) }), i); }) }), void 0)] }), void 0) }), void 0)] }), void 0));
};
//
// parse and format
//
/**
 * Return a date representing the first date of the parsed value or the first
 * date of the current month if the parsed value is invalid.
 *
 * @param {String} s - The string to parse
 */
function firstDate(s) {
    var ymd = parseDate(s);
    var first = ymd ? new Date(ymd[0], ymd[1], ymd[2]) : new Date();
    first.setHours(12, 0, 0, 0);
    first.setDate(1);
    return first;
}
/**
 * Parses a simple date in the format dd-mm-yyyy.
 * It is very lininent because it parses correctly dd, dd-mm, and dd-mm-yyyy.
 * It assumes the current date's month and year in the cases of an incomplete date.
 *
 * @param {String} s - The string to parse
 * @return {Array [ y, m, d ]} - The date represented as an array with a 0 based month
 */
function parseDate(s) {
    var parse = /^\s*([0-3]?\d)(?:-(?:([0-1]?\d)?(?:-(\d{4})?)?)?)?\s*$/i.exec(s);
    if (parse) {
        var now = new Date();
        var d = +parse[1], m = parse[2] ? +parse[2] - 1 : now.getMonth(), y = parse[3] ? +parse[3] : now.getFullYear(), valid = new Date(y, m, d, 12, 0, 0, 0);
        if (valid.getFullYear() === y && valid.getMonth() === m && valid.getDate() === d) {
            return [y, m, d];
        }
        else {
            return null;
        }
    }
    return null;
}
/**
 * Formats a date in the simple format dd-mm-yyyy.
 *
 * @param {Array [ y, m, d ]} ymd - The date representes as an array with a 0 based month
 * @returns {String} s - The formated string
 */
function formatDate(ymd) {
    var m = ymd[1] + 1;
    return (ymd[2] < 10 ? '0' + ymd[2] : ymd[2]) + '-' + (m < 10 ? '0' + m : m) + '-' + ymd[0];
}

//
// Delay
//
var Delay = function (_a) {
    var _b = _a.delay, delay = _b === void 0 ? 250 : _b, children = _a.children;
    var _c = useState(false), show = _c[0], setShow = _c[1];
    useEffect(function () {
        var timeout = setTimeout(function () { return setShow(true); }, delay);
        return function () { return clearTimeout(timeout); };
    }, [delay, setShow]);
    return show ? children : null;
};

var Group = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: className }, { children: children }), void 0));
};
var Label = function (_a) {
    var children = _a.children;
    return (jsx("label", __assign({ className: "block text-sm uppercase tracking-wide font-bold mb-1" }, { children: children }), void 0));
};
var Input = function (_a) {
    var error = _a.error, className = _a.className, props = __rest(_a, ["error", "className"]);
    return (jsx("input", __assign({}, props, { className: classnames('form-input w-full', { 'border-danger-500': error }, className) }), void 0));
};
var TextArea = function (_a) {
    var error = _a.error, className = _a.className, props = __rest(_a, ["error", "className"]);
    return (jsx("textarea", __assign({}, props, { className: classnames('form-input w-full', { 'border-danger-500': error }, className) }), void 0));
};
var SearchInput = function (_a) {
    _a.error; var className = _a.className, props = __rest(_a, ["error", "className"]);
    return (jsx("div", __assign({ className: className }, { children: jsxs("div", __assign({ className: "relative" }, { children: [jsx("input", __assign({}, props, { type: "search", placeholder: "Search", className: "form-input w-full pl-10" }), void 0),
                jsx("div", __assign({ className: "absolute inset-y-0 left-0 pl-3 flex items-center justify-center" }, { children: jsx(SvgSearchIcon, { className: "text-content h-5 w-5 stroke-current stroke-2" }, void 0) }), void 0)] }), void 0) }), void 0));
};
var Error = function (_a) {
    var error = _a.error, className = _a.className, children = _a.children;
    return (jsx(Fragment, { children: error && jsx("p", __assign({ className: classnames('mt-1 text-danger-500 text-xs italic truncate', className) }, { children: children }), void 0) }, void 0));
};
var Checkbox = function (_a) {
    _a.checked; _a.error; _a.type; var className = _a.className, children = _a.children, props = __rest(_a, ["checked", "error", "type", "className", "children"]);
    return (jsxs("label", __assign({ className: "block flex flex-row items-center" }, { children: [jsx("input", __assign({}, props, { type: "checkbox", className: classnames('form-checkbox text-primary-500', className) }), void 0),
            jsx("span", __assign({ className: classnames('ml-2', className) }, { children: children }), void 0)] }), void 0));
};
var Radio = function (_a) {
    _a.checked; _a.error; _a.type; var className = _a.className, children = _a.children, props = __rest(_a, ["checked", "error", "type", "className", "children"]);
    return (jsxs("label", __assign({ className: "block flex flex-row items-center" }, { children: [jsx("input", __assign({}, props, { type: "radio", className: classnames('form-radio text-primary-500', className) }), void 0),
            jsx("span", __assign({ className: "ml-2" }, { children: children }), void 0)] }), void 0));
};
var Select = function (_a) {
    _a.value; _a.onChange; var className = _a.className, children = _a.children;
    return (jsx("select", __assign({ className: classnames('form-select py-0', className) }, { children: children }), void 0));
};
Select.Option = function (_a) {
    var value = _a.value, children = _a.children;
    return (
    // <option>uno</option>
    jsx("option", __assign({ value: value }, { children: children }), void 0));
}; //  as FC<{ value?: any, className?: string }>;

var Loading = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 'base' : _b, className = _a.className;
    return (jsx("svg", __assign({ width: "45", height: "45", viewBox: "0 0 45 45", xmlns: "http://www.w3.org/2000/svg", stroke: "currentColor", className: classnames('inline-block', 'text-primary-500', {
            'h-6 w-6': size === 'sm',
            'h-10 w-10': size === 'base',
            'h-14 w-14': size === 'lg'
        }, className) }, { children: jsxs("g", __assign({ fill: "none", fillRule: "evenodd", transform: "translate(1 1)", strokeWidth: "2" }, { children: [jsxs("circle", __assign({ cx: "22", cy: "22", r: "6", strokeOpacity: "0" }, { children: [jsx("animate", { attributeName: "r", begin: "1.5s", dur: "3s", values: "6;22", calcMode: "linear", repeatCount: "indefinite" }, void 0),
                        jsx("animate", { attributeName: "stroke-opacity", begin: "1.5s", dur: "3s", values: "1;0", calcMode: "linear", repeatCount: "indefinite" }, void 0),
                        jsx("animate", { attributeName: "stroke-width", begin: "1.5s", dur: "3s", values: "2;0", calcMode: "linear", repeatCount: "indefinite" }, void 0)] }), void 0),
                jsxs("circle", __assign({ cx: "22", cy: "22", r: "6", strokeOpacity: "0" }, { children: [jsx("animate", { attributeName: "r", begin: "3s", dur: "3s", values: "6;22", calcMode: "linear", repeatCount: "indefinite" }, void 0),
                        jsx("animate", { attributeName: "stroke-opacity", begin: "3s", dur: "3s", values: "1;0", calcMode: "linear", repeatCount: "indefinite" }, void 0),
                        jsx("animate", { attributeName: "stroke-width", begin: "3s", dur: "3s", values: "2;0", calcMode: "linear", repeatCount: "indefinite" }, void 0)] }), void 0),
                jsx("circle", __assign({ cx: "22", cy: "22", r: "8" }, { children: jsx("animate", { attributeName: "r", begin: "0s", dur: "1.5s", values: "6;1;2;3;4;5;6", calcMode: "linear", repeatCount: "indefinite" }, void 0) }), void 0)] }), void 0) }), void 0));
};

var Postit = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: "postit-container" }, { children: jsx("div", __assign({ className: classnames('postit', className) }, { children: children }), void 0) }), void 0));
};

var CustomSelect = function (_a) {
    var options = _a.options, _b = _a.key, key = _b === void 0 ? function (option) { return option; } : _b; _a.value; _a.onChange; _a.children;
    var _e = useState(false), show = _e[0], setShow = _e[1];
    var _f = useShower(function () { return setShow(false); }), valueRef = _f[0], popperRef = _f[1];
    return (jsxs("div", __assign({ className: "relative" }, { children: [jsx("div", __assign({ ref: valueRef, className: "pl-4 pr-8 py-2 truncate border rounded-lg", onClick: function () { return setShow(!show); } }, { children: "as jkasd lkjasd lkajsd lkasjd laksjd laksjd laskdj alskdjalsdkj d" }), void 0),
            jsx("div", __assign({ className: "absolute inset-y-0 right-0 pr-3 flex items-center justify-center" }, { children: jsx(SvgAngleDownIcon, { className: "text-content h-4 w-4 stroke-current stroke-2" }, void 0) }), void 0),
            show &&
                jsx("div", __assign({ ref: popperRef, className: "absolute left-0 mt-1 py-1 bg-content-fg border border-conteng-border rounded" }, { children: options.map(function (option) {
                        return jsx("div", __assign({ className: "hover:bg-primary-500 hover:text-content-fg px-3" }, { children: key(option) }), key(option));
                    }) }), void 0)] }), void 0));
};

// constants
var morning = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var noon = [12];
var afternoon = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var minutes = [15, 30, 45];
/**
 * DatePicker. Select a date with one click.
 */
var TimePicker = function (_a) {
    var name = _a.name, value = _a.value, onChange = _a.onChange, placeholder = _a.placeholder;
    var _b = useTranslation(); _b.t; var ready = _b.ready;
    var _c = useState(false), show = _c[0], setShow = _c[1];
    var _d = useShower(function () { return setShow(false); }), valueRef = _d[0], popperRef = _d[1];
    var times = useRef({ watch: 8 });
    var timesRef = useRef(null);
    useEffect(function () { scroll(); });
    // handlers
    var handleShow = function () { if (!show) {
        setShow(true);
    } };
    var handleHide = function () { if (show) {
        setShow(false);
    } };
    var handleFocus = handleShow;
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 9: // tab
            case 13: // enter
                var hm = parseTime(value);
                if (hm) {
                    handleFinalChange(hm);
                }
                handleHide();
                break;
            default:
                handleShow();
        }
    };
    var handleChange = function (e) {
        onChange({ target: { name: name, value: e.target.value } });
    };
    var handleFinalChange = function (hm) {
        var value = formatTime(hm);
        onChange({ target: { name: name, value: value } });
        handleHide();
    };
    // navigation
    var handleClickPrevHour = function () {
        if (times.current.watch > 0) {
            times.current.watch = times.current.watch - 1;
            scroll();
        }
    };
    var handleClickNoon = function () {
        times.current.watch = 8;
        scroll();
    };
    var handleClickNextHour = function () {
        if (times.current.watch < 14) {
            times.current.watch = times.current.watch + 1;
            scroll();
        }
    };
    var handleClickTime = function (hm) {
        handleFinalChange(hm);
        handleHide();
    };
    var scroll = function () {
        if (timesRef.current) {
            var t_1 = timesRef.current;
            var h = t_1.scrollHeight / 24;
            t_1.scrollTop = times.current.watch * h;
        }
    };
    // setup
    var v = parseTime(value);
    var selected = v ? v : [-1, -1];
    // format
    function hourClasses(hm) {
        return hm[0] === selected[0] ? 'bg-info-500 text-white text-xs group hover:text-xs hover:bg-secondary-300' : 'group text-xs hover:text-xs hover:bg-secondary-300';
    }
    function hourMinuteClasses(hm) {
        if (hm[0] === selected[0]) {
            return hm[0] === selected[0] && hm[1] === selected[1] ?
                'text-white    text-base group-hover:text-content hover:text-base                    hover:bg-secondary-500' :
                'text-info-500           group-hover:text-content hover:text-base                    hover:bg-secondary-500';
        }
        else {
            return 'text-muted                                    hover:text-base hover:text-content hover:bg-secondary-500';
        }
    }
    // render
    return (jsxs("div", __assign({ className: "relative" }, { children: [jsx("div", __assign({ ref: valueRef }, { children: jsx("input", { name: name, value: value, onChange: handleChange, onFocus: handleFocus, onKeyDown: handleKeyDown, placeholder: placeholder, className: "w-full px-2 py-1 border border-content-border rounded" }, "input") }), void 0),
            ready && show &&
                jsxs("div", __assign({ ref: popperRef, className: "absolute left-0 mt-1 bg-content-fg border border-conteng-border rounded overflow-hidden" }, { children: [jsx("div", __assign({ className: "px-2 py-1 bg-gray-400" }, { children: jsxs("div", __assign({ className: "text-right" }, { children: [jsx("button", __assign({ className: "focus:outline-none", onClick: handleClickPrevHour }, { children: jsx(SvgAngleUpIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" }, void 0) }), void 0),
                                    jsx("button", __assign({ className: "px-2 focus:outline-none", onClick: handleClickNoon }, { children: jsx(SvgCircleIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" }, void 0) }), void 0),
                                    jsx("button", __assign({ className: "focus:outline-none", onClick: handleClickNextHour }, { children: jsx(SvgAngleDownIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" }, void 0) }), void 0)] }), void 0) }), void 0),
                        jsx("div", __assign({ ref: timesRef, className: "h-64 overflow-scroll" }, { children: jsxs("table", __assign({ className: "table-fixed text-center" }, { children: [jsx("thead", { children: jsxs("tr", { children: [jsx("th", __assign({ className: "w-10" }, { children: "Hora" }), void 0),
                                                minutes.map(function (m) { return jsx("td", { className: "w-10" }, void 0); })] }, void 0) }, void 0),
                                    jsx("tbody", __assign({ className: "cursor-pointer" }, { children: morning.map(function (h) {
                                            return jsxs("tr", __assign({ className: hourClasses([h, 0]) }, { children: [jsx("th", __assign({ className: "text-base group-hover:text-content group-hover:bg-secondary-500", onClick: function (e) { return handleClickTime([h, 0]); } }, { children: formatHour(h) }), void 0),
                                                    minutes.map(function (m) {
                                                        return jsx("td", __assign({ onClick: function (e) { return handleClickTime([h, m]); }, className: hourMinuteClasses([h, m]) }, { children: m }), m);
                                                    })] }), h);
                                        }) }), void 0),
                                    jsx("tbody", __assign({ className: "bg-gray-200 cursor-pointer" }, { children: noon.map(function (h) {
                                            return jsxs("tr", __assign({ className: hourClasses([h, 0]) }, { children: [jsx("th", __assign({ className: "text-base group-hover:text-content group-hover:bg-secondary-500", onClick: function (e) { return handleClickTime([h, 0]); } }, { children: formatHour(h) }), void 0),
                                                    minutes.map(function (m) {
                                                        return jsx("td", __assign({ onClick: function (e) { return handleClickTime([h, m]); }, className: hourMinuteClasses([h, m]) }, { children: m }), m);
                                                    })] }), h);
                                        }) }), void 0),
                                    jsx("tbody", __assign({ className: "cursor-pointer" }, { children: afternoon.map(function (h) {
                                            return jsxs("tr", __assign({ className: hourClasses([h, 0]) }, { children: [jsx("th", __assign({ className: "text-base group-hover:text-content group-hover:bg-secondary-500", onClick: function (e) { return handleClickTime([h, 0]); } }, { children: formatHour(h) }), void 0),
                                                    minutes.map(function (m) {
                                                        return jsx("td", __assign({ onClick: function (e) { return handleClickTime([h, m]); }, className: hourMinuteClasses([h, m]) }, { children: m }), m);
                                                    })] }), h);
                                        }) }), void 0)] }), void 0) }), void 0)] }), void 0)] }), void 0));
};
//
// parse and format
//
/**
 * Parses a time in the simple format hh:mm(am|pm).
 *
 * @param {String} s - The string to parse
 * @return {Array[h, m]} - The time represented as an array
 */
function parseTime(s) {
    var parse = /^\s*?([0-1]?\d)(?::([0-5]?\d)?)?\s*(AM?|PM?)?\s*$/i.exec(s);
    if (parse) {
        var h = +parse[1];
        if (h === 0 || h > 12) {
            return null;
        }
        var m = parse[2] ? +parse[2] : 0;
        if (parse[3]) {
            if (parse[3].match(/p/)) {
                h = (h === 12 ? 12 : h + 12);
            }
            else {
                h = (h === 12 ? 0 : h);
            }
        }
        else {
            if (h < 8) {
                h += 12;
            }
        }
        return [h, m];
    }
    return null;
}
/**
 * Formats an hour.
 *
 * @param Formats a time in
 */
function formatHour(h) {
    return String(h <= 12 ? (h > 0 ? h : 12) : (h - 12));
}
/**
 * Formats a time in the simple format hh:mm(am|pm).
 *
 * @param {Array[h, m]} hm - The time represented as an array
 * @returns {String} s - The formated string
 */
function formatTime(hm) {
    var h = hm[0], m = hm[1];
    if (h < 12) {
        if (h === 0) {
            h = 12;
        }
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + 'am';
    }
    else {
        if (h > 12) {
            h = h - 12;
        }
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + 'pm';
    }
}

var Context = createContext({});
var Helium = function (_a) {
    var _b = _a.navigator, navigator = _b === void 0 ? false : _b, _c = _a.setNavigator, setNavigator = _c === void 0 ? function (show) { return null; } : _c, children = _a.children;
    return (jsx(Context.Provider, __assign({ value: { navigator: navigator, setNavigator: setNavigator } }, { children: jsx("div", __assign({ className: "relative min-h-screen flex flex-col" }, { children: children }), void 0) }), void 0));
};
// header
var Header = function (_a) {
    var className = _a.className, children = _a.children;
    var context = useContext(Context);
    return (jsx("header", __assign({ className: classnames(context.navigator ? 'pl-0 md:pl-56' : 'pl-0', 'fixed z-10 inset-x-0 top-0 h-16 flex-none text-content bg-content-fg border-b border-content-border transition duration-700 ease-in-out transition-spacing') }, { children: jsx("div", __assign({ className: classnames('h-full', className) }, { children: children }), void 0) }), void 0));
};
// toggle
var Toggle = function (_a) {
    var always = _a.always, children = _a.children;
    var context = useContext(Context);
    return (jsx("div", __assign({ className: classnames('h-16 w-16 text-center hover:text-white hover:bg-primary-500', always ? 'flex' : 'flex md:hidden', 'flex-row items-center justify-center') }, { children: jsx("button", __assign({ onClick: function () { return context.setNavigator(!context.navigator); }, className: "focus:outline-none" }, { children: children }), void 0) }), void 0));
};
var Navigator = function (_a) {
    var className = _a.className, children = _a.children;
    var context = useContext(Context);
    return (jsxs(Fragment, { children: [context.navigator && jsx("div", { className: classnames('fixed z-10 inset-0 bg-gray-800 opacity-50 md:hidden'), onClick: function () { return context.setNavigator(false); } }, void 0),
            jsx("div", __assign({ className: classnames('fixed z-20 inset-y-0 left-0 w-56 transform', context.navigator ? 'translate-x-0' : '-translate-x-56', 'transition duration-700 ease-in-out transition-transform') }, { children: jsx("div", __assign({ className: classnames('h-full flex flex-col text-navigator bg-navigator-bg', className) }, { children: children }), void 0) }), void 0)] }, void 0));
};
var NavigatorHeader = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: "flex-none h-16 border-b border-navigator-border" }, { children: jsx("div", __assign({ className: classnames('w-full h-full', className) }, { children: children }), void 0) }), void 0));
};
var NavigatorContent = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('flex-grow overflow-y-scroll', className) }, { children: children }), void 0));
};
var NavigatorFooter = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('flex-none flex-none border-t border-navigator-border', className) }, { children: children }), void 0));
};
Navigator.Header = NavigatorHeader;
Navigator.Content = NavigatorContent;
Navigator.Footer = NavigatorFooter;
var Main = function (_a) {
    var children = _a.children;
    var context = useContext(Context);
    return (jsx("main", __assign({ className: classnames('h-full', context.navigator ? 'pl-0 md:pl-56' : 'pl-0', 'pt-16 flex-grow flex flex-row items-stretch overflow-y-auto text-content bg-content-bg transition duration-700 ease-in-out transition-spacing') }, { children: children }), void 0));
};
Main.Content = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('w-2/3 flex-grow', className) }, { children: children }), void 0));
};
Main.Side = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('w-1/3 bg-content-fg border-l border-content-border', className) }, { children: children }), void 0));
};
var Panel = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('flex flex-col', className) }, { children: children }), void 0));
};
Panel.Group = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('px-3 py-2 text-xs text-muted uppercase', className) }, { children: children }), void 0));
};
Panel.Item = function (_a) {
    var active = _a.active, className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('-px-3 pl-6 py-2 cursor-pointer', { 'bg-primary-500': active }, className) }, { children: children }), void 0));
};

export { Button, Card, Checkbox, CustomSelect, DatePicker, Delay, Error, Group, Header, Helium, index as Icons, Input, Label, Loading, Main, MoreOptionsButton, Navigator, Panel, Postit, Radio, SearchInput, Select, TextArea, TimePicker, Toggle, useShower };
//# sourceMappingURL=index.esm.js.map
