'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var classnames = _interopDefault(require('classnames'));
var reactI18next = require('react-i18next');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
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
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("path", { className: "angle-down-icon_svg__st0", d: "M26 12l-10 8-10-8" })));
}

function SvgAngleLeftIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("path", { className: "angle-left-icon_svg__st0", d: "M20 26l-8-10 8-10" })));
}

function SvgAngleRightIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("path", { d: "M12 6l8 10-8 10" })));
}

function SvgAngleUpIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("path", { d: "M6 20l10-8 10 8" })));
}

function SvgCheckIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round", className: "check-icon_svg__feather check-icon_svg__feather-check" }, props),
        React.createElement("path", { d: "M20 6L9 17l-5-5" })));
}

function SvgCircleIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("circle", { cx: 16, cy: 16, r: 10 })));
}

function SvgEditIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("path", { d: "M16 26h10.5M21.3 6.7c1-1 2.5-1 3.5 0s1 2.5 0 3.5L10.2 24.8 5.5 26l1.2-4.7L21.3 6.7z" })));
}

function SvgHamburgerIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("path", { className: "hamburger-icon_svg__st0", d: "M24 10H8c-1.1 0-2-.9-2-2v0c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2zM24 18H8c-1.1 0-2-.9-2-2v0c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2zM24 26H8c-1.1 0-2-.9-2-2v0c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2z" })));
}

function SvgNimboxIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 216.833 227.492" }, props),
        React.createElement("path", { fill: "#F7CE3C", d: "M42.111 98.075l66.325-6.472v15.281z" }),
        React.createElement("path", { fill: "#FFE6A2", d: "M174.76 98.075l-66.324-6.472v15.281z" }),
        React.createElement("path", { fill: "#00607F", d: "M108.436 206.377v-99.945l-66.325-8.357v84.979z" }),
        React.createElement("path", { fill: "#4EC1E0", d: "M85.836 138.691l-64.721-14.778L42.048 98.09l65.277 8.202z" }),
        React.createElement("path", { fill: "#FF4C00", d: "M108.396 206.377v-99.945l66.364-8.357-.038 84.979z" }),
        React.createElement("path", { fill: "#FFA400", d: "M130.995 138.691l64.722-14.778-20.935-25.823-65.278 8.202z" }),
        React.createElement("g", { fill: "#FFA400" },
            React.createElement("path", { d: "M111.659 80.687l6.629-59.572H98.543l6.632 59.572c1.07-.032 2.148-.055 3.239-.055 1.094 0 2.172.022 3.245.055zM162.059 53.946l-12.275-7.089-15.302 37.132c1.542.471 2.991.979 4.343 1.526l23.234-31.569zM67.049 46.857l-12.277 7.089 23.234 31.569a52.461 52.461 0 014.344-1.526L67.049 46.857z" }))));
}

function SvgSearchIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("circle", { cx: 14.5, cy: 14.5, r: 8.5 }),
        React.createElement("path", { d: "M26 26l-5.5-5.5" })));
}

function SvgSpeechBubbleIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("path", { d: "M16 6C9.4 6 4 9.6 4 14c0 2.1 1.2 4 3.2 5.4l-1.8 5.8 8.1-3.4c.8.1 1.6.2 2.5.2 6.6 0 12-3.6 12-8s-5.4-8-12-8z" })));
}

function SvgSquareIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("path", { className: "square-icon_svg__st0", d: "M6 6h20v20H6z" })));
}

function SvgThumbTackIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("path", { d: "M16 20v6M17.9 7.4l1.4 8.2c2.5.7 4.4 2.3 4.7 4.3h-4l-8 .1H8c.4-2 2.3-3.6 4.7-4.3l1.4-8.2s-1.3-.7-1.3-.9v-.2c0-.2.3-.3.5-.3h5.2c.3-.1.5.1.5.2v.2c.2.2-1.1.9-1.1.9z" })));
}

function SvgThumbsUpIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("path", { d: "M18.1 13V9c0-1.7-1.3-3-3-3l-4 9v11h11.3c1 0 1.8-.7 2-1.7l1.4-9c.2-1.1-.6-2.1-1.7-2.3h-6zm-6.9 13h-3c-1.1 0-2-.9-2-2v-7c0-1.1.9-2 2-2h3" })));
}

function SvgWaffleIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("circle", { cx: 8, cy: 8, r: 2 }),
        React.createElement("circle", { cx: 16, cy: 8, r: 2 }),
        React.createElement("circle", { cx: 24, cy: 8, r: 2 }),
        React.createElement("circle", { cx: 8, cy: 16, r: 2 }),
        React.createElement("circle", { cx: 16, cy: 16, r: 2 }),
        React.createElement("circle", { cx: 24, cy: 16, r: 2 }),
        React.createElement("circle", { cx: 8, cy: 24, r: 2 }),
        React.createElement("circle", { cx: 16, cy: 24, r: 2 }),
        React.createElement("circle", { cx: 24, cy: 24, r: 2 })));
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AngleDownIcon: SvgAngleDownIcon,
    AngleLeftIcon: SvgAngleLeftIcon,
    AngleRightIcon: SvgAngleRightIcon,
    AngleUpIcon: SvgAngleUpIcon,
    CheckIcon: SvgCheckIcon,
    CircleIcon: SvgCircleIcon,
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

//
// buttons
//
var ButtonBar = function (_a) {
    var className = _a.className, children = _a.children;
    return (React__default.createElement("div", { className: classnames(className) }, children));
};
var PrimaryButton = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (React__default.createElement("button", __assign({}, props, { className: "mr-3 last:mr-0 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 border border-primary-500 rounded" }), children));
};
var SecondaryButton = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (React__default.createElement("button", __assign({}, props, { className: "mr-3 last:mr-0 bg-transparent hover:bg-primary-700 font-bold py-2 px-4 border border-content-border rounded" }), children));
};
var LinkButton = function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (React__default.createElement("button", __assign({}, props, { className: classnames('focus:outline-none -mx-2 px-2 text-sm text-muted hover:bg-gray-200 rounded-full cursor-pointer', className) }), children));
};
var MoreOptionsButton = function (_a) {
    var value = _a.value, onChange = _a.onChange, children = _a.children, props = __rest(_a, ["value", "onChange", "children"]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(LinkButton, __assign({}, props, { onClick: function () { return onChange(!value); } }),
            React__default.createElement(SvgAngleRightIcon, { className: classnames('inline w-4 h-4 mr-1 stroke-current stroke-2 transform', { 'rotate-90': value }, 'transition duration-500 ease-in-out transtition-transform') }),
            "m\u00E1s opciones"),
        value && children));
};

//
// cards
//
var Cards = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "grid grid-cols-1 gap-3" }, children));
};
var Card = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "bg-content-fg border border-content-border rounded" }, children));
};
Card.Header = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "border-b border-content-border p-3" }, children));
};
Card.Body = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "p-3" }, children));
};
Card.Footer = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "border-t border-content-border p-3" }, children));
};

var useShower = function (onClickOutside) {
    var target = React.useRef(null);
    var popper = React.useRef(null);
    var handleDocumentClick = function (event) {
        if (popper.current && !popper.current.contains(event.target)) {
            if (target.current && !target.current.contains(event.target)) {
                onClickOutside();
            }
        }
    };
    React.useEffect(function () {
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
    var _b = reactI18next.useTranslation(), t = _b.t, ready = _b.ready;
    var _c = React.useState(firstDate(value)), calendar = _c[0], setCalendar = _c[1];
    React.useEffect(function () { return setCalendar(firstDate(value)); }, [value]);
    var _d = React.useState(false), show = _d[0], setShow = _d[1];
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
    return (React__default.createElement("div", { className: "relative" },
        React__default.createElement("div", { ref: valueRef },
            React__default.createElement("input", { key: "input", name: name, value: value, onChange: handleChange, onFocus: handleFocus, onKeyDown: handleKeyDown, placeholder: placeholder, className: "w-full px-2 py-1 border border-content-border rounded" })),
        ready && show &&
            React__default.createElement("div", { ref: popperRef, className: "absolute left-0 mt-1 bg-content-fg border border-conteng-border rounded overflow-hidden" },
                React__default.createElement("div", { className: "flex flex-row" },
                    React__default.createElement("div", null,
                        React__default.createElement("div", { className: "px-2 py-1 flex flex-row items-center justify-between bg-gray-400" },
                            React__default.createElement("div", { className: "flex-grow text-center font-bold" },
                                months[calendar.getMonth()],
                                " ",
                                calendar.getFullYear()),
                            React__default.createElement("div", null,
                                React__default.createElement("button", { className: "focus:outline-none", onClick: handleClickPrevMonth },
                                    React__default.createElement(SvgAngleLeftIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" })),
                                React__default.createElement("button", { className: "px-2 focus:outline-none", onClick: handleClickToday },
                                    React__default.createElement(SvgCircleIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" })),
                                React__default.createElement("button", { className: "focus:outline-none", onClick: handleClickNextMonth },
                                    React__default.createElement(SvgAngleRightIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" })))),
                        React__default.createElement("table", { className: "table-fixed text-center" },
                            React__default.createElement("thead", null,
                                React__default.createElement("tr", null, days.map(function (d, i) { return React__default.createElement("th", { key: i, className: "w-10 px-1" }, d); }))),
                            React__default.createElement("tbody", { className: "cursor-pointer" }, weeks.map(function (w) {
                                return React__default.createElement("tr", { key: w[0].getTime() }, w.map(function (d) { return React__default.createElement("td", { key: d.getTime(), onClick: function () { return handleClickDate(d); }, className: dayClasses(d) }, d.getDate()); }));
                            })))),
                    shortcuts &&
                        React__default.createElement("div", { className: "flex flex-col justify-between bg-gray-300 cursor-pointer" }, namedDays.map(function (s, i) { return React__default.createElement("div", { key: i, onClick: function () { return handleClickDate(s.date(new Date(today))); }, className: "px-2 hover:text-white hover:bg-secondary-500" }, t("namedDays." + s.label)); }))))));
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

var DefaultNavigator = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "h-full flex-grow flex flex-col" }, children));
};
DefaultNavigator.Content = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "flex-grow overflow-y-scroll" }, children));
};
DefaultNavigator.Group = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "px-3 py-2 text-xs text-muted uppercase" }, children));
};
DefaultNavigator.Item = function (_a) {
    var active = _a.active, children = _a.children;
    return (React__default.createElement("div", { className: classnames('px-3 pl-6 py-2 cursor-pointer', { 'bg-primary-500': active }) }, children));
};
DefaultNavigator.Footer = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "px-3 py-2 flex-none border-t border-navigator-border" }, children));
};
DefaultNavigator.Copyright = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "" }, children));
};

//
// form
//
var Group = function (_a) {
    var className = _a.className, children = _a.children;
    return (React__default.createElement("div", { className: className }, children));
};
var Label = function (_a) {
    var children = _a.children;
    return (React__default.createElement("label", { className: "block text-sm font-bold mb-0" }, children));
};
var Input = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React__default.createElement("input", __assign({}, props, { className: classnames('w-full px-2 py-1 border border-content-border rounded-lg', className) })));
};
var TextArea = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React__default.createElement("textarea", __assign({}, props, { className: classnames('w-full px-2 py-1 border border-content-border rounded-lg', className) })));
};

var Postit = function (_a) {
    var className = _a.className, children = _a.children;
    return (React__default.createElement("div", { className: "postit-container" },
        React__default.createElement("div", { className: classnames('postit', className) }, children)));
};

var Select = function (_a) {
    var options = _a.options, _b = _a.key, key = _b === void 0 ? function (option) { return option; } : _b, _c = _a.value, _d = _a.onChange, children = _a.children;
    var _e = React.useState(false), show = _e[0], setShow = _e[1];
    var _f = useShower(function () { return setShow(false); }), valueRef = _f[0], popperRef = _f[1];
    return (React__default.createElement("div", { className: "relative" },
        React__default.createElement("div", { ref: valueRef, className: "pl-4 pr-8 py-2 truncate border rounded-lg", onClick: function () { return setShow(!show); } }, "as jkasd lkjasd lkajsd lkasjd laksjd laksjd laskdj alskdjalsdkj d"),
        React__default.createElement("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center justify-center" },
            React__default.createElement(SvgAngleDownIcon, { className: "text-content h-4 w-4 stroke-current stroke-2" })),
        show &&
            React__default.createElement("div", { ref: popperRef, className: "absolute left-0 mt-1 py-1 bg-content-fg border border-conteng-border rounded" }, options.map(function (option) {
                return React__default.createElement("div", { key: key(option), className: "hover:bg-primary-500 hover:text-content-fg px-3" }, key(option));
            }))));
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
    var _b = reactI18next.useTranslation(), t = _b.t, ready = _b.ready;
    var _c = React.useState(false), show = _c[0], setShow = _c[1];
    var _d = useShower(function () { return setShow(false); }), valueRef = _d[0], popperRef = _d[1];
    var times = React.useRef({ watch: 8 });
    var timesRef = React.useRef(null);
    React.useEffect(function () { scroll(); });
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
    return (React__default.createElement("div", { className: "relative" },
        React__default.createElement("div", { ref: valueRef },
            React__default.createElement("input", { key: "input", name: name, value: value, onChange: handleChange, onFocus: handleFocus, onKeyDown: handleKeyDown, placeholder: placeholder, className: "w-full px-2 py-1 border border-content-border rounded" })),
        ready && show &&
            React__default.createElement("div", { ref: popperRef, className: "absolute left-0 mt-1 bg-content-fg border border-conteng-border rounded overflow-hidden" },
                React__default.createElement("div", { className: "px-2 py-1 bg-gray-400" },
                    React__default.createElement("div", { className: "text-right" },
                        React__default.createElement("button", { className: "focus:outline-none", onClick: handleClickPrevHour },
                            React__default.createElement(SvgAngleUpIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" })),
                        React__default.createElement("button", { className: "px-2 focus:outline-none", onClick: handleClickNoon },
                            React__default.createElement(SvgCircleIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" })),
                        React__default.createElement("button", { className: "focus:outline-none", onClick: handleClickNextHour },
                            React__default.createElement(SvgAngleDownIcon, { className: "h-4 w-4 text-content stroke-current stroke-2" })))),
                React__default.createElement("div", { ref: timesRef, className: "h-64 overflow-scroll" },
                    React__default.createElement("table", { className: "table-fixed text-center" },
                        React__default.createElement("thead", null,
                            React__default.createElement("tr", null,
                                React__default.createElement("th", { className: "w-10" }, "Hora"),
                                minutes.map(function (m) { return React__default.createElement("td", { className: "w-10" }); }))),
                        React__default.createElement("tbody", { className: "cursor-pointer" }, morning.map(function (h) {
                            return React__default.createElement("tr", { key: h, className: hourClasses([h, 0]) },
                                React__default.createElement("th", { className: "text-base group-hover:text-content group-hover:bg-secondary-500", onClick: function (e) { return handleClickTime([h, 0]); } }, formatHour(h)),
                                minutes.map(function (m) {
                                    return React__default.createElement("td", { key: m, onClick: function (e) { return handleClickTime([h, m]); }, className: hourMinuteClasses([h, m]) }, m);
                                }));
                        })),
                        React__default.createElement("tbody", { className: "bg-gray-200 cursor-pointer" }, noon.map(function (h) {
                            return React__default.createElement("tr", { key: h, className: hourClasses([h, 0]) },
                                React__default.createElement("th", { className: "text-base group-hover:text-content group-hover:bg-secondary-500", onClick: function (e) { return handleClickTime([h, 0]); } }, formatHour(h)),
                                minutes.map(function (m) {
                                    return React__default.createElement("td", { key: m, onClick: function (e) { return handleClickTime([h, m]); }, className: hourMinuteClasses([h, m]) }, m);
                                }));
                        })),
                        React__default.createElement("tbody", { className: "cursor-pointer" }, afternoon.map(function (h) {
                            return React__default.createElement("tr", { key: h, className: hourClasses([h, 0]) },
                                React__default.createElement("th", { className: "text-base group-hover:text-content group-hover:bg-secondary-500", onClick: function (e) { return handleClickTime([h, 0]); } }, formatHour(h)),
                                minutes.map(function (m) {
                                    return React__default.createElement("td", { key: m, onClick: function (e) { return handleClickTime([h, m]); }, className: hourMinuteClasses([h, m]) }, m);
                                }));
                        })))))));
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

var Context = React.createContext({});
var Helium = function (_a) {
    var _b = _a.navigator, side = _b === void 0 ? false : _b, _c = _a.onNavigator, onSide = _c === void 0 ? function (side) { return null; } : _c, children = _a.children;
    return (React__default.createElement(Context.Provider, { value: { side: side, onSide: onSide } },
        React__default.createElement("div", { className: "relative min-h-screen flex flex-col" }, children)));
};
var Header = function (_a) {
    var children = _a.children;
    return (React__default.createElement("header", { className: "fixed z-10 inset-x-0 top-0 h-16 flex-none flex flex-row items-stretch bg-content-fg" }, children));
};
var HeaderSide = function (_a) {
    var children = _a.children;
    var context = React.useContext(Context);
    return (React__default.createElement("div", { className: classnames(!context.side ? 'w-16 md:w-56' : 'w-16', 'px-3 z-20 flex flex-row items-center justify-between text-navigator bg-navigator-bg border-b border-navigator-border') }, children));
};
var HeaderContent = function (_a) {
    var children = _a.children;
    return (React__default.createElement("div", { className: "flex-grow flex flex-row items-center px-3 border-b border-content-border" }, children));
};
Header.Navigator = HeaderSide;
Header.Content = HeaderContent;
// toggle
var Toggle = function (_a) {
    var children = _a.children;
    var context = React.useContext(Context);
    return (React__default.createElement("span", { className: "w-16 text-center bg-navigator-bg md:hidden" },
        React__default.createElement("button", { onClick: function () { return context.onSide(!context.side); } }, children)));
};
//  navigator
var Navigator = function (_a) {
    var children = _a.children;
    var context = React.useContext(Context);
    return (React__default.createElement(React__default.Fragment, null,
        context.side && React__default.createElement("div", { className: classnames('fixed z-10 inset-0 bg-gray-800 opacity-50'), onClick: function () { return context.onSide(false); } }),
        React__default.createElement("div", { className: classnames('fixed z-20 inset-y-0 left-0 w-56 mt-16 text-navigator bg-navigator-bg transform', !context.side ? '-translate-x-56 md:translate-x-0' : 'translate-x-0', 'transition duration-150 ease-in-out transition-transform') }, children)));
};
var Main = function (_a) {
    var children = _a.children;
    var context = React.useContext(Context);
    return (React__default.createElement("main", { className: classnames('pt-16', !context.side ? 'pl-0 md:pl-56' : 'pl-0', 'flex-grow flex flex-row items-stretch overflow-y-auto text-content bg-content-bg') }, children));
};
Main.Content = function (_a) {
    var className = _a.className, children = _a.children;
    return (React__default.createElement("div", { className: classnames('w-2/3', className) }, children));
};
Main.Side = function (_a) {
    var className = _a.className, children = _a.children;
    return (React__default.createElement("div", { className: classnames('w-1/3 bg-content-bg border-l border-content-border', className) }, children));
};

exports.ButtonBar = ButtonBar;
exports.Card = Card;
exports.Cards = Cards;
exports.DatePicker = DatePicker;
exports.DefaultNavigator = DefaultNavigator;
exports.Group = Group;
exports.Header = Header;
exports.Helium = Helium;
exports.Icons = index;
exports.Input = Input;
exports.Label = Label;
exports.LinkButton = LinkButton;
exports.Main = Main;
exports.MoreOptionsButton = MoreOptionsButton;
exports.Navigator = Navigator;
exports.Postit = Postit;
exports.PrimaryButton = PrimaryButton;
exports.SecondaryButton = SecondaryButton;
exports.Select = Select;
exports.TextArea = TextArea;
exports.TimePicker = TimePicker;
exports.Toggle = Toggle;
exports.useShower = useShower;
//# sourceMappingURL=index.js.map
