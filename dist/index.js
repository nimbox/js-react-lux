import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import tinycolor from 'tinycolor2';
import React, { useEffect, createContext, useContext, useRef, useImperativeHandle, useState, useLayoutEffect, createRef, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import _debounce from 'lodash/debounce';
import ReactDOM, { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { v4 } from 'uuid';
import { useDrag, useDrop } from 'react-dnd';

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

/**
 * Avatar. Representation of a user in the system.
 */
var Avatar = function (_a) {
    var src = _a.src, initials = _a.initials, color = _a.color, backgroundColor = _a.backgroundColor;
    var c = backgroundColor ? color : tinycolor(color).isDark() ? 'white' : 'black';
    var bg = backgroundColor ? backgroundColor : color;
    if (src) {
        return (jsx("span", __assign({ className: "inline-flex flex-row justify-center content-center rounded-full overflow-hidden", style: {
                width: '1.5em',
                verticalAlign: '10%'
            } }, { children: jsx("span", __assign({ className: "w-full bg-center bg-cover", style: { fontSize: '0.5em', backgroundImage: "url(" + src + ")" } }, { children: "\u00A0" }), void 0) }), void 0));
    }
    else {
        return (jsx("span", __assign({ className: "inline-flex flex-row justify-center content-center rounded-full overflow-hidden", style: {
                width: '1.5em',
                verticalAlign: '10%',
                color: c, backgroundColor: bg
            } }, { children: jsx("span", __assign({ style: { fontSize: '0.5em' } }, { children: initials }), void 0) }), void 0));
    }
};

var Badge = React.forwardRef(function (_a, ref) {
    var color = _a.color, backgroundColor = _a.backgroundColor, children = _a.children;
    return (jsx("span", __assign({ ref: ref, className: "px-2 rounded", style: { color: color, backgroundColor: backgroundColor } }, { children: children }), void 0));
});

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
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { d: "M25 9L13.3 23 7 15.3" }, void 0) }), void 0));
}

function SvgCircleIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("circle", { cx: 16, cy: 16, r: 10 }, void 0) }), void 0));
}

function SvgCrossIcon(props) {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: jsx("path", { d: "M8 8l16 16M24 8L8 24" }, void 0) }), void 0));
}

function SvgDangerIcon(props) {
    return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: [jsx("path", { d: "M8 8l16 16M24 8L8 24" }, void 0), jsx("circle", { cx: 16, cy: 16, r: 15 }, void 0)] }), void 0));
}

function SvgInfoIcon(props) {
    return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: [jsx("circle", { cx: 16, cy: 8, r: 2 }, void 0), jsx("path", { d: "M14 14h2v12h2" }, void 0), jsx("circle", { cx: 16, cy: 16, r: 15 }, void 0)] }), void 0));
}

function SvgSearchIcon(props) {
    return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: [jsx("circle", { cx: 14.5, cy: 14.5, r: 8.5 }, void 0), jsx("path", { d: "M26 26l-5.5-5.5" }, void 0)] }), void 0));
}

function SvgSuccessIcon(props) {
    return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: [jsx("path", { className: "success-icon_svg__st0", d: "M25 9L13.3 23 7 15.3" }, void 0), jsx("circle", { className: "success-icon_svg__st0", cx: 16, cy: 16, r: 15 }, void 0)] }), void 0));
}

function SvgWarningIcon(props) {
    return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 0.5, strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: [jsx("path", { d: "M16 6v12" }, void 0), jsx("circle", { cx: 16, cy: 16, r: 15 }, void 0), jsx("circle", { cx: 16, cy: 24, r: 2 }, void 0)] }), void 0));
}

var controlScale = {
    'xs': 'text-xs px-2 py-0.5',
    'sm': 'text-sm px-2.5 py-1',
    'base': 'px-3 py-2',
    'lg': 'text-lg px-4 py-2'
};
var controlSize = {
    'xs': 'h-4 w-4',
    'sm': 'h-5 w-5',
    'base': 'h-6 w-6',
    'lg': 'h-6 w-6'
};
var controlText = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': '',
    'lg': 'text-lg'
};
var controlSmallText = {
    'xs': 'text-1xs',
    'sm': 'text-xs',
    'base': 'text-sm',
    'lg': ''
};

// Button
var CLASSES = {
    'filled': {
        'primary': 'text-primary-800 bg-primary-500 border border-primary-500 hover:text-primary-900 hover:bg-primary-600 hover:border-primary-600 focus:ring-primary-500 rounded',
        'secondary': 'text-secondary-800 bg-secondary-500 border border-secondary-500 hover:text-secondary-900 hover:bg-secondary-600 hover:border-secondary-600 focus:ring-secondary-500 rounded',
        'muted': 'text-gray-500 bg-gray-300 border border-gray-300 hover:text-gray-600 hover:bg-gray-400 hover:border-gray-400 focus:ring-gray-300 rounded'
    },
    'text': {
        'primary': 'text-primary-500 border border-transparent hover:text-primary-600 hover:bg-primary-100 hover:border-primary-100 focus:ring-primary-500 rounded',
        'secondary': 'text-secondary-500 border border-transparent hover:text-secondary-600 hover:bg-secondary-100 hover:border-secondary-100 focus:ring-secondary-500 rounded',
        'muted': 'text-gray-400 border border-transparent hover:text-gray-500 hover:bg-gray-100 hover:border-gray-100 focus:ring-gray-300 rounded'
    },
    'outlined': {
        'primary': 'text-primary-500 border border-primary-300 hover:text-primary-600 hover:bg-primary-100 hover:border-primary-500 focus:ring-primary-500 rounded',
        'secondary': 'text-secondary-500 border border-secondary-300 hover:text-secondary-600 hover:bg-secondary-100 hover:border-secondary-500 focus:ring-secondary-500 rounded',
        'muted': 'text-gray-400 border border-gray-300 hover:text-gray-500 hover:bg-gray-100 hover:border-gray-500 focus:ring-gray-300 rounded'
    },
    'link': {
        'primary': 'underline text-primary-500 hover:text-primary-600 focus:ring-primary-500 rounded',
        'secondary': 'underline text-secondary-500 hover:text-secondary-600 focus:ring-secondary-500 rounded',
        'muted': 'underline text-gray-400 hover:text-gray-500 focus:ring-gray-300 rounded'
    }
};
var Button = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? 'primary' : _b, _c = _a.variant, variant = _c === void 0 ? 'filled' : _c, start = _a.start, end = _a.end, children = _a.children; _a.className; var props = __rest(_a, ["color", "variant", "start", "end", "children", "className"]);
    return (jsx("button", __assign({}, props, { ref: ref, className: classnames(CLASSES[variant][color], 'lux-control-font', { 'lux-control-padding': variant !== 'link' }, 'focus:ring focus:ring-opacity-50 focus:outline-none', 'disabled:opacity-50 disabled:cursor-not-allowed') }, { children: (!start && !end) ?
            jsx(Fragment, { children: children }, void 0) :
            jsxs("span", __assign({ className: "flex flex-row items-center" }, { children: [start && jsx("span", __assign({ className: "flex-none", style: { marginRight: '0.25em' } }, { children: start }), void 0), jsx("span", __assign({ className: "flex-grow self-baseline" }, { children: children }), void 0), end && jsx("span", __assign({ className: "flex-none", style: { marginLeft: '0.25em' } }, { children: end }), void 0)] }), void 0) }), void 0));
});
var RoundButton = function (_a) {
    var _b = _a.scale, scale = _b === void 0 ? 'base' : _b, _c = _a.color, color = _c === void 0 ? 'primary' : _c, className = _a.className, children = _a.children, props = __rest(_a, ["scale", "color", "className", "children"]);
    return (jsx("button", __assign({}, props, { className: classnames(controlSize[scale], controlSmallText[scale], 'flex flex-row justify-center items-center', 'text-white font-bold', { 'bg-primary-500 hover:bg-primary-600': color === 'primary' }, { 'bg-info-500 hover:bg-info-600': color === 'info' }, { 'bg-danger-500 hover:bg-danger-600': color === 'danger' }, 'border border-control-border', 'rounded-full focus:outline-none', className) }, { children: children }), void 0));
};
var MoreOptionsButton = function (_a) {
    var _b = _a.scale, scale = _b === void 0 ? 'base' : _b, _c = _a.value, value = _c === void 0 ? false : _c, onChange = _a.onChange, className = _a.className, children = _a.children, props = __rest(_a, ["scale", "value", "onChange", "className", "children"]);
    var t = useTranslation().t;
    return (jsxs(Fragment, { children: [jsxs("span", __assign({ className: classnames(controlText[scale], 'relative text-primary-500 hover:text-primary-700 cursor-pointer', className), onClick: function () { return onChange(!value); } }, props, { children: [jsx("span", __assign({ className: "absolute inset-y-0 left-0 flex flex-row justify-center items-center", style: { width: '1em' } }, { children: jsx(SvgAngleRightIcon, { width: "1em", height: "1em", className: classnames('inline stroke-current stroke-2 transform', { 'rotate-90': value }, 'transition duration-150 ease-in-out transtition-transform') }, void 0) }), void 0), jsx("span", __assign({ style: { paddingLeft: '1.25em' } }, { children: !value ? t('more-options') : t('less-options') }), void 0)] }), void 0), value && children] }, void 0));
};

var Card = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('bg-content-fg border border-content-border rounded', className) }, { children: children }), void 0));
};
Card.Header = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('border-b border-content-border', className) }, { children: children }), void 0));
};
Card.Body = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: className }, { children: children }), void 0));
};
Card.Footer = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('border-t border-content-border', className) }, { children: children }), void 0));
};

var useOnOutsideClick = function (onOutsideClick, show) {
    var elements = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        elements[_i - 2] = arguments[_i];
    }
    useEffect(function () {
        if (show) {
            var handleMouseDown_1 = function (event) {
                var inside = elements.find(function (element) { return element && element.contains(event.target); });
                if (!inside) {
                    onOutsideClick();
                }
            };
            document.addEventListener('mousedown', handleMouseDown_1);
            return function () { return document.removeEventListener('mousedown', handleMouseDown_1); };
        }
    }, __spreadArray([show], elements));
};

var Context$4 = createContext({ scale: 'base', error: false });
var Control = function (_a) {
    var _b = _a.scale, scale = _b === void 0 ? 'base' : _b, _c = _a.error, error = _c === void 0 ? false : _c, className = _a.className, style = _a.style, children = _a.children;
    return (jsx(Context$4.Provider, __assign({ value: { error: error, scale: scale } }, { children: jsx("div", __assign({ className: classnames('flex flex-col w-full', className), style: style }, { children: children }), void 0) }), void 0));
};
Control.Label = (function (_a) {
    var badge = _a.badge, className = _a.className, children = _a.children;
    var context = useContext(Context$4);
    var Badge = badge;
    return (jsx("label", __assign({ className: classnames(className, 'block', context.error ? 'text-danger-500' : 'text-control-border', controlText[context.scale || 'base']) }, { children: jsxs("div", __assign({ className: "flex flex-row justify-between align-baseline" }, { children: [jsx("span", __assign({ className: "uppercase tracking-tighter" }, { children: children }), void 0), badge &&
                    (typeof badge === 'string' || badge instanceof String)
                    ?
                        jsx("span", { children: badge }, void 0)
                    :
                        Badge ?
                            jsx(Badge, {}, void 0)
                            : ''] }), void 0) }), void 0));
});
Control.Message = (function (_a) {
    var className = _a.className, children = _a.children;
    var context = useContext(Context$4);
    return (jsx("div", __assign({ className: classnames(context.error ? 'text-danger-500' : 'text-control-border', controlSmallText[context.scale || 'base'], className) }, { children: children }), void 0));
});
Control.Error = (function (_a) {
    var className = _a.className, children = _a.children;
    var context = useContext(Context$4);
    return children ?
        (jsx("div", __assign({ className: classnames('text-danger-500', controlSmallText[context.scale || 'base'], className) }, { children: children }), void 0))
        : null;
});
Control.Label.displayName = 'Control.Label';
Control.Message.displayName = 'Control.Help';
Control.Error.displayName = 'Control.Error';

var Input = React.forwardRef(function (_a, ref) {
    var error = _a.error, className = _a.className, props = __rest(_a, ["error", "className"]);
    var context = useContext(Context$4);
    return (jsx("input", __assign({}, props, { ref: ref, className: classnames('block w-full', 'lux-control-font lux-control-padding', 'rounded border border-control-border', error || context.error ?
            'text-danger-500 border-danger-500 focus:border-danger-500 focus:ring-danger-500 placeholder-danger-500' :
            'focus:border-primary-500 focus:ring-primary-500 placeholder-control-border', 'focus:ring focus:ring-opacity-50 focus:outline-none', 'placeholder-opacity-40', 'disabled:opacity-50', className) }), void 0));
});

var IconInput = React.forwardRef(function (_a, ref) {
    var left = _a.left, right = _a.right; _a.error; var className = _a.className, props = __rest(_a, ["left", "right", "error", "className"]);
    return (jsxs("div", __assign({ className: classnames('relative', className) }, { children: [jsx(Input, __assign({ ref: ref, className: classnames({ 'pl-9': left, 'pr-9': right }) }, props), void 0), left &&
                jsx("div", __assign({ className: "absolute inset-y-0 left-0 flex flex-row justify-center items-center", style: { width: '2em' } }, { children: left }), void 0), right &&
                jsx("div", __assign({ className: "absolute inset-y-0 right-0 flex flex-row justify-center items-center", style: { width: '2em' } }, { children: right }), void 0)] }), void 0));
});

var SearchInput = React.forwardRef(function (_a, ref) {
    var props = __rest(_a, []);
    return (jsx(IconInput, __assign({ ref: ref, right: jsx(SvgSearchIcon, { width: "1em", height: "1em", className: "text-control-border", style: { strokeWidth: '0.25em' } }, void 0) }, props), void 0));
});

var ChooseFn = function (_a, ref) {
    var _b;
    var _c = _a.noSearch, noSearch = _c === void 0 ? false : _c, name = _a.name, _d = _a.recentValues, recentValues = _d === void 0 ? [] : _d, items = _a.items, loading = _a.loading, error = _a.error, getItem = _a.getItem, searchItems = _a.searchItems, itemValue = _a.itemValue, itemMatch = _a.itemMatch, renderItem = _a.renderItem, renderListItem = _a.renderListItem, CreateComponent = _a.CreateComponent, inline = _a.inline, _e = _a.align, align = _e === void 0 ? 'stretch' : _e, className = _a.className, dropdownClassName = _a.dropdownClassName, props = __rest(_a, ["noSearch", "name", "recentValues", "items", "loading", "error", "getItem", "searchItems", "itemValue", "itemMatch", "renderItem", "renderListItem", "CreateComponent", "inline", "align", "className", "dropdownClassName"]);
    var inputRef = useRef();
    useImperativeHandle(ref, function () { return inputRef.current; });
    var _f = useState(''), search = _f[0], setSearch = _f[1];
    var _g = useState(''), internalValue = _g[0], setInternalValue = _g[1];
    useContext(Context$4);
    var _h = useState(false), visible = _h[0], setVisible = _h[1];
    var _j = useState(false), active = _j[0], setActive = _j[1];
    useLayoutEffect(function () { setActive(visible); }, [visible]);
    var target = useRef(null);
    var _k = useState(null), popper = _k[0], setPopper = _k[1];
    useOnOutsideClick(function () { if (internalError) {
        reset();
    } if (visible) {
        setVisible(false);
    } }, visible, target.current, popper);
    var _l = useState(loading || false), internalLoading = _l[0], setInternalLoading = _l[1];
    var _m = useState(error || false), internalError = _m[0], setInternalError = _m[1];
    var _o = useState(noSearch && items ? items : []), searchResults = _o[0], setSearchResults = _o[1];
    var _p = useState(recentValues), searchRecents = _p[0], setSearchRecents = _p[1];
    var searchRef = useRef();
    var _q = useState(null), cursor = _q[0], setCursor = _q[1];
    var searchRecentsLength = searchRecents.length;
    var _r = React.useState([]), listRecentsRefs = _r[0], setlistRecentsRefs = _r[1];
    var searchResultsLength = searchResults.length;
    var _s = React.useState([]), listResultsRefs = _s[0], setlistResultsRefs = _s[1];
    useEffect(function () {
        setlistRecentsRefs(Array(searchRecentsLength).fill(createRef(), 0, searchRecentsLength).map(function (_, i) { return listRecentsRefs[i] || createRef(); }));
    }, [searchRecentsLength]);
    useEffect(function () {
        setlistResultsRefs(Array(searchResultsLength).fill(createRef(), 0, searchResultsLength).map(function (_, i) { return listResultsRefs[i] || createRef(); }));
    }, [searchResultsLength]);
    useEffect(function () { var _a; setInternalValue((_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.value); }, [(_b = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _b === void 0 ? void 0 : _b.value]);
    useEffect(function () { if (visible && !noSearch) {
        searchRef.current.focus();
    } }, [visible]);
    useEffect(function () { setInternalLoading(loading); if (noSearch && items && !loading) {
        setSearchResults(items);
    } }, [loading]);
    useEffect(function () { setInternalError(error); }, [error]);
    var reset = function () {
        setVisible(false);
        setCursor(null);
        setInternalError(false);
        if (!noSearch) {
            setSearch('');
            setSearchRecents(recentValues);
            setSearchResults([]);
        }
    };
    function setRefValue(event, element, value) {
        var _a;
        event.preventDefault();
        event.stopPropagation();
        var inputSetter = (_a = Object === null || Object === void 0 ? void 0 : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')) === null || _a === void 0 ? void 0 : _a.set;
        if (inputSetter) {
            inputSetter.call(element.current, value);
            var inputEvent = new Event('input', { bubbles: true });
            element.current.dispatchEvent(inputEvent);
        }
    }
    function handleKeyDown(event) {
        var _a, _b, _c, _d;
        var recentsLength = searchRecents.length;
        var searchLength = searchResults.length;
        event.stopPropagation();
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                if (cursor != null && cursor > 0) {
                    if (cursor < recentsLength) {
                        (_a = listRecentsRefs[cursor].current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                            block: "center",
                            inline: "start",
                            behavior: "smooth"
                        });
                    }
                    else {
                        (_b = listResultsRefs[cursor - searchRecents.length].current) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
                            block: "center",
                            inline: "start",
                            behavior: "smooth"
                        });
                    }
                    setCursor(cursor - 1);
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (cursor != null && cursor < (searchLength + recentsLength) - 1) {
                    if (cursor >= 0) {
                        if (cursor < recentsLength) {
                            (_c = listRecentsRefs[cursor].current) === null || _c === void 0 ? void 0 : _c.scrollIntoView({
                                block: "center", inline: "end",
                                behavior: "smooth"
                            });
                        }
                        else {
                            (_d = listResultsRefs[cursor - recentsLength].current) === null || _d === void 0 ? void 0 : _d.scrollIntoView({
                                block: "center", inline: "end",
                                behavior: "smooth"
                            });
                        }
                    }
                    setCursor(cursor + 1);
                }
                else if (cursor === null) {
                    setCursor(0);
                }
                break;
            case 'Enter':
                if (cursor != null && visible) {
                    if (cursor < recentsLength) {
                        handleClick(event, searchRecents[cursor]);
                    }
                    else {
                        handleClick(event, itemValue(searchResults[cursor - recentsLength]));
                    }
                }
                if (!visible) {
                    setVisible(true);
                }
                break;
            case 'Tab' :
                if (cursor != null && visible) {
                    if (cursor < recentsLength) {
                        handleClick(event, searchRecents[cursor]);
                    }
                    else {
                        handleClick(event, itemValue(searchResults[cursor - recentsLength]));
                    }
                }
                if (cursor === null) {
                    setVisible(false);
                }
                break;
        }
    }
    var doSearch = useCallback(_debounce(function (q) { return __awaiter(void 0, void 0, void 0, function () {
        var results, results;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, , 10]);
                    setCursor(null);
                    if (!items) return [3 /*break*/, 3];
                    if (!!internalLoading) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve(function () {
                            if (q != '') {
                                var results_1 = items.filter(function (item) {
                                    return itemMatch(q, item) && !(recentValues === null || recentValues === void 0 ? void 0 : recentValues.some(function (el) { return el === itemValue(item); })) && itemValue(item) != internalValue;
                                });
                                return results_1;
                            }
                            else {
                                return [];
                            }
                        })];
                case 1:
                    results = _c.sent();
                    setSearchResults(results);
                    _c.label = 2;
                case 2: return [3 /*break*/, 8];
                case 3:
                    if (!searchItems) return [3 /*break*/, 8];
                    setInternalLoading(true);
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, 7, 8]);
                    return [4 /*yield*/, Promise.resolve(searchItems(q))];
                case 5:
                    results = _c.sent();
                    setSearchResults(results.filter(function (item) { return itemValue(item) != internalValue; }));
                    return [3 /*break*/, 8];
                case 6:
                    _c.sent();
                    setInternalError(true);
                    return [3 /*break*/, 8];
                case 7:
                    setInternalLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [3 /*break*/, 10];
                case 9:
                    _c.sent();
                    setInternalError(true);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); }, 200), [items, internalValue, internalLoading]);
    var limitRecents = _debounce(function (q) {
        if (recentValues) {
            var recentsResults = recentValues.filter(function (value) {
                var item = getItem(value);
                if (item) {
                    return itemMatch(q, item) && itemValue(item) != internalValue;
                }
            });
            setSearchRecents(recentsResults);
        }
        if (q === '') {
            setSearchRecents(recentValues);
        }
    }, 200);
    var handleSearch = function (e) {
        setSearch(e.target.value);
        doSearch(e.target.value);
        limitRecents(e.target.value);
        setCursor(null);
    };
    var handleClick = function (event, value) {
        if (event && inputRef && value) {
            setRefValue(event, inputRef, value);
            reset();
        }
    };
    var handleSubmit = function (create) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setInternalLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, Promise.resolve(create)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    _a.sent();
                    setInternalError(true);
                    return [3 /*break*/, 5];
                case 4:
                    setInternalLoading(false);
                    reset();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (jsxs("div", __assign({ className: classnames('relative inline-block', inline ? 'max-w-full' : 'w-full') }, { children: [jsxs("div", __assign({ ref: target, tabIndex: active ? -1 : 0, onFocus: function () { if (!visible)
                    setVisible(true); }, onMouseDown: function (e) { e.preventDefault(); setVisible(!visible); }, onKeyDown: noSearch ? handleKeyDown : undefined, className: classnames('relative rounded', inline || 'border border-control-border', 'focus:border-primary-500 focus:ring focus:ring-primary-500', 'focus:ring-opacity-50 focus:outline-none', className), style: inline ? { paddingRight: '1.25em' } : { padding: '0.5em 2em 0.5em 0.75em' } }, { children: [(!internalLoading && internalValue && renderItem(getItem(internalValue))) || jsx("span", { children: "\u00A0" }, void 0), jsxs("div", __assign({ className: "absolute inset-y-0 right-0 flex flex-row justify-center items-center cursor-pointer", style: { width: '1em', marginRight: inline ? '0' : '0.5em' } }, { children: [internalLoading &&
                                jsx(Loading, {}, void 0), internalError &&
                                jsx(SvgDangerIcon, { className: "text-red-500 stroke-current stroke-2" }, void 0), !internalLoading && !internalError &&
                                jsx(SvgAngleDownIcon, { width: "1em", height: "1em", className: "inline text-control-border stroke-current stroke-2" }, void 0)] }), void 0)] }), void 0), visible &&
                jsxs("div", __assign({ ref: setPopper, className: classnames('absolute max-h-60 overflow-auto z-10', 'mt-2 space-y-2', 'bg-white', 'rounded border border-control-border', inline && 'w-max', {
                        'left-0': align === 'start',
                        'right-0': align === 'end',
                        'inset-x-0': align === 'stretch'
                    }, dropdownClassName), style: { padding: '0.5em 0.75em 0.5em 0.75em' } }, { children: [!noSearch &&
                            jsx(SearchInput, { ref: searchRef, value: search, onChange: handleSearch, onKeyDown: handleKeyDown, disabled: internalError }, "input"), (searchRecents.length > 0) &&
                            jsx("ul", __assign({ className: "m-0 p-0" }, { children: searchRecents.map(function (value, i) { return (jsx("li", __assign({ ref: listRecentsRefs[i], onClick: !internalError ? function (e) { return handleClick(e, value); } : undefined, className: classnames('cursor-pointer my-0 -ml-3 -mr-3 pl-3 pr-3', 'hover:text-white hover:bg-secondary-500', cursor === i && 'bg-primary-500') }, { children: renderListItem ? renderListItem(getItem(value)) : renderItem(getItem(value)) }), value)); }) }), void 0), (searchResults.length > 0) &&
                            jsxs(Fragment, { children: [(searchRecents.length > 0) &&
                                        jsx("div", { className: "h-px bg-control-border", style: { margin: '0.5em -0.75em' } }, void 0), jsx("ul", __assign({ className: "m-0 p-0" }, { children: searchResults.map(function (item, i) { return (jsx("li", __assign({ ref: listResultsRefs[i], onClick: !internalError ? function (e) { return handleClick(e, itemValue(item)); } : undefined, className: classnames('cursor-pointer my-0 -ml-3 -mr-3 pl-3 pr-3', 'hover:text-white hover:bg-secondary-500', cursor === i + searchRecents.length && 'bg-primary-500') }, { children: renderListItem ? renderListItem(item) : renderItem(item) }), itemValue(item))); }) }), void 0)] }, void 0), (search && searchResults.length === 0 && searchRecents.length === 0 && CreateComponent) &&
                            jsx(CreateComponent, { search: search, disabled: loading, onSubmit: handleSubmit }, void 0)] }), void 0), jsx("input", __assign({ className: "hidden", type: "text", name: name, ref: inputRef }, props), void 0)] }), void 0));
};
/**
 * Descripción
 *
 * Seleccionar y Cerrar
 *   - Enter
 *   - Tab && custor != -1
 *   - Click
 * Cerrar
 *   - Tab && cursor == -1
 *   - onClickOutside
 *
 *
 */
var Choose = React.forwardRef(ChooseFn);

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

var Loading = function (_a) {
    var _b = _a.scale, scale = _b === void 0 ? 'base' : _b, className = _a.className, _c = _a.colorClassName, colorClassName = _c === void 0 ? 'text-primary-500' : _c;
    return (jsx("svg", __assign({ width: "45", height: "45", viewBox: "0 0 45 45", xmlns: "http://www.w3.org/2000/svg", stroke: "currentColor", className: classnames('inline-block', colorClassName, {
            'h-6 w-6': scale === 'sm',
            'h-10 w-10': scale === 'base',
            'h-14 w-14': scale === 'lg'
        }, className) }, { children: jsxs("g", __assign({ fill: "none", fillRule: "evenodd", transform: "translate(1 1)", strokeWidth: "2" }, { children: [jsxs("circle", __assign({ cx: "22", cy: "22", r: "6", strokeOpacity: "0" }, { children: [jsx("animate", { attributeName: "r", begin: "1.5s", dur: "3s", values: "6;22", calcMode: "linear", repeatCount: "indefinite" }, void 0), jsx("animate", { attributeName: "stroke-opacity", begin: "1.5s", dur: "3s", values: "1;0", calcMode: "linear", repeatCount: "indefinite" }, void 0), jsx("animate", { attributeName: "stroke-width", begin: "1.5s", dur: "3s", values: "2;0", calcMode: "linear", repeatCount: "indefinite" }, void 0)] }), void 0), jsxs("circle", __assign({ cx: "22", cy: "22", r: "6", strokeOpacity: "0" }, { children: [jsx("animate", { attributeName: "r", begin: "3s", dur: "3s", values: "6;22", calcMode: "linear", repeatCount: "indefinite" }, void 0), jsx("animate", { attributeName: "stroke-opacity", begin: "3s", dur: "3s", values: "1;0", calcMode: "linear", repeatCount: "indefinite" }, void 0), jsx("animate", { attributeName: "stroke-width", begin: "3s", dur: "3s", values: "2;0", calcMode: "linear", repeatCount: "indefinite" }, void 0)] }), void 0), jsx("circle", __assign({ cx: "22", cy: "22", r: "8" }, { children: jsx("animate", { attributeName: "r", begin: "0s", dur: "1.5s", values: "6;1;2;3;4;5;6", calcMode: "linear", repeatCount: "indefinite" }, void 0) }), void 0)] }), void 0) }), void 0));
};

var Popup = function (_a) {
    var _b = _a.visible, visible = _b === void 0 ? false : _b, _c = _a.onChangeVisible, onChangeVisible = _c === void 0 ? function (visible) { return null; } : _c, _d = _a.placement, placement = _d === void 0 ? 'bottom' : _d, Component = _a.Component, children = _a.children;
    var _e = useState(null), target = _e[0], setTarget = _e[1];
    var _f = useState(null), popper = _f[0], setPopper = _f[1];
    var _g = useState(null), arrow = _g[0], setArrow = _g[1];
    useOnOutsideClick(function () { return visible && onChangeVisible(false); }, visible, target, popper);
    var _h = usePopper(target, popper, {
        placement: placement,
        modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            { name: 'arrow', options: { padding: 4, element: arrow } },
        ]
    }), styles = _h.styles, attributes = _h.attributes;
    return (jsxs(Fragment, { children: [React.cloneElement(children, { ref: setTarget }), visible && ReactDOM.createPortal(jsxs("div", __assign({ ref: setPopper }, attributes.popper, { className: "z-30 popper-element text-base rounded border border-control-border bg-white", style: styles.popper }, { children: [jsx(Component, {}, void 0), jsx("div", __assign({ ref: setArrow }, attributes.arrow, { className: "popper-arrow", style: styles.arrow }), void 0)] }), void 0), document.querySelector('#modal'))] }, void 0));
};

var Postit = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: "postit-container" }, { children: jsx("div", __assign({ className: classnames('postit', className) }, { children: children }), void 0) }), void 0));
};

var Context$3 = createContext({ value: null, setValue: function () { return null; } });
var Tabs = function (_a) {
    var value = _a.value, setValue = _a.setValue, className = _a.className, children = _a.children;
    return (jsx(Context$3.Provider, __assign({ value: { value: value, setValue: setValue } }, { children: jsx("ul", __assign({ className: classnames('flex flex-row', className) }, { children: children }), void 0) }), void 0));
};
var TabsOption = function (_a) {
    var value = _a.value, className = _a.className, children = _a.children;
    var context = useContext(Context$3);
    return (jsx("li", __assign({ onClick: function () { return context.setValue(value); }, className: classnames('px-4 py-2 text-control-border hover:text-primary-700', { 'text-primary-500 border-b-2 border-primary-500': context.value === value }, 'cursor-pointer', className) }, { children: children }), void 0));
};
Tabs.Option = TabsOption;

var Cross = function (_a) {
    var showCross = _a.showCross, crossColor = _a.crossColor, circleColor = _a.circleColor, props = __rest(_a, ["showCross", "crossColor", "circleColor"]);
    return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", strokeLinecap: "round", strokeLinejoin: "round" }, props, { children: [jsx("circle", { cx: "16", cy: "16", r: "14", fill: circleColor }, void 0), showCross && jsx("path", { d: "M10 10L22 22M22 10L10 22", stroke: crossColor, strokeWidth: "0.25em" }, void 0)] }), void 0));
};
var Tag = function (_a) {
    var _b = _a.color, propertyColor = _b === void 0 ? '#906090' : _b, propertyBackground = _a.background, onClick = _a.onClick, onDelete = _a.onDelete, children = _a.children;
    var color = useMemo(function () { return (!propertyBackground ? (tinycolor(propertyColor).isDark() ? 'white' : 'black') : propertyColor); }, [propertyColor, propertyBackground]);
    var backgroundColor = useMemo(function () { return !propertyBackground ? propertyColor : propertyBackground; }, [propertyColor, propertyBackground]);
    var crossBackgroundColor = useMemo(function () { return tinycolor(backgroundColor).darken(5).toString(); }, [backgroundColor]);
    var crossBackgroundHoverColor = useMemo(function () { return tinycolor(crossBackgroundColor).darken(10).toString(); }, [crossBackgroundColor]);
    var _c = useState(crossBackgroundColor), hoverColor = _c[0], setHoverColor = _c[1];
    return (jsxs("span", __assign({ className: 'inline-flex flex-row items-baseline max-w-full rounded-full', style: { lineHeight: '1', paddingLeft: '0.25em', paddingTop: '0.125em', paddingRight: '0.5em', paddingBottom: '0.125em', color: color, backgroundColor: backgroundColor } }, { children: [jsx(Cross, { showCross: !!onDelete, onMouseEnter: function () { return setHoverColor(crossBackgroundHoverColor); }, onMouseLeave: function () { return setHoverColor(crossBackgroundColor); }, onClick: function () { return onDelete && onDelete(); }, crossColor: color, circleColor: onDelete ? hoverColor : crossBackgroundColor, className: "block flex-none self-center cursor-pointer", style: { marginRight: '0.125em' } }, void 0), jsx("span", __assign({ onClick: !onDelete ? onClick : undefined, className: classnames('block flex-1 max-w-full truncate', { 'hover:underline cursor-pointer': onClick && !onDelete }), style: { height: '1.2em', lineHeight: '1.2em' } }, { children: children }), void 0)] }), void 0));
};

//
var Icon = {
    'success': function (_a) {
        var className = _a.className;
        return jsx(SvgSuccessIcon, { className: className }, void 0);
    },
    'info': function (_a) {
        var className = _a.className;
        return jsx(SvgInfoIcon, { className: className }, void 0);
    },
    'warning': function (_a) {
        var className = _a.className;
        return jsx(SvgWarningIcon, { className: className }, void 0);
    },
    'danger': function (_a) {
        var className = _a.className;
        return jsx(SvgDangerIcon, { className: className }, void 0);
    }
};
var Context$2 = createContext({ addToast: function (type, toast, dismiss) { return null; } });
var useToast = function () {
    var context = useContext(Context$2);
    return { addToast: context.addToast };
};
//
var ToastProvider = function (_a) {
    _a.location; _a.autoDelete; var _d = _a.autoDeleteTimeout, autoDeleteTimeout = _d === void 0 ? 5000 : _d, children = _a.children;
    var _e = useState([]), toasts = _e[0], setToasts = _e[1];
    var addToast = function (type, item, dismiss) {
        setToasts(function (current) {
            var component = React.isValidElement(item) ? item : jsx(ToastContent, { title: item.title, description: item.description }, void 0);
            var d = dismiss !== 0;
            var dt = dismiss || autoDeleteTimeout;
            return __spreadArray(__spreadArray([], current), [{ id: v4(), type: type, component: component, autoDelete: d, autoDeleteTimeout: dt }]);
        });
    };
    var deleteToast = function (id) {
        setToasts(function (current) { return current.filter(function (t) { return t.id !== id; }); });
    };
    return (jsxs(Context$2.Provider, __assign({ value: { addToast: addToast } }, { children: [children, jsx(ToastContainer, { children: toasts.map(function (t) {
                    return jsx(Toast, __assign({}, t, { onDelete: function () { return deleteToast(t.id); } }), t.id);
                }) }, void 0)] }), void 0));
};
var ToastContainer = function (_a) {
    var children = _a.children;
    return (jsx("div", __assign({ className: "fixed w-64 p-2 pt-20 inset-y-0 right-0 space-y-2 pointer-events-none" }, { children: children }), void 0));
};
var ToastContent = function (_a) {
    var title = _a.title, description = _a.description;
    return (jsxs(Fragment, { children: [title && jsx("div", __assign({ className: "font-bold" }, { children: title }), void 0), jsx("div", { children: description }, void 0)] }, void 0));
};
var Toast = function (_a) {
    var type = _a.type, component = _a.component, _b = _a.autoDelete, autoDelete = _b === void 0 ? true : _b, _c = _a.autoDeleteTimeout, autoDeleteTimeout = _c === void 0 ? 5000 : _c, onDelete = _a.onDelete;
    var _d = useState(true), initial = _d[0], setInitial = _d[1];
    useEffect(function () {
        var timeout = setTimeout(function () { return setInitial(false); }, 100);
        return function () { return clearTimeout(timeout); };
    }, []);
    useEffect(function () {
        var timeout = setTimeout(function () {
            if (autoDelete) {
                onDelete();
            }
        }, autoDeleteTimeout);
        return function () { return clearTimeout(timeout); };
    }, [autoDelete, autoDeleteTimeout, onDelete]);
    var IconType = Icon[type];
    return (jsxs("div", __assign({ className: classnames('px-4 py-4 flex flex-row items-start space-x-4 rounded transition-transform duration-250 transform translate-x-0', { 'translate-x-64': initial }, { 'text-white bg-primary-500': type === 'success' }, { 'text-white bg-info-500': type === 'info' }, { 'text-white bg-secondary-500': type === 'warning' }, { 'text-white bg-danger-500': type === 'danger' }, 'pointer-events-auto') }, { children: [jsx("div", { children: jsx(IconType, { className: "w-6 h-6 stroke-2" }, void 0) }, void 0), jsx("div", __assign({ className: "flex-grow" }, { children: component }), void 0), jsx("div", __assign({ onClick: onDelete, className: "cursor-pointer" }, { children: jsx(SvgCrossIcon, { className: "w-6 h-6 stroke-2" }, void 0) }), void 0)] }), void 0));
};

var Modal = function (_a) {
    var visible = _a.visible; _a.onHide; var children = _a.children;
    return visible ? createPortal(jsx("div", __assign({ className: "fixed inset-0 bg-gray-700 bg-opacity-80" }, { children: React.Children.only(children) }), void 0), document.querySelector('#modal')) : null;
};

var Dialog = function (_a) {
    var visible = _a.visible, onHide = _a.onHide, className = _a.className, children = _a.children;
    return (jsx(Modal, __assign({ visible: visible, onHide: onHide }, { children: jsx("div", __assign({ className: "w-full h-full flex flex-row justify-center items-center" }, { children: jsx("div", __assign({ className: className }, { children: children }), void 0) }), void 0) }), void 0));
};
Dialog.Header = function (_a) {
    var _b = _a.noBorder, noBorder = _b === void 0 ? false : _b, className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames({ 'border-b border-content-border': !noBorder }, className) }, { children: children }), void 0));
};
Dialog.Body = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: className }, { children: children }), void 0));
};
Dialog.Footer = function (_a) {
    var className = _a.className, children = _a.children;
    return (jsx("div", __assign({ className: classnames('border-t border-content-border', className) }, { children: children }), void 0));
};

var KanbanContext = createContext({
    isDraggingColumn: false,
    setIsDraggingColumn: function () { return undefined; },
    isDraggingCard: false,
    setIsDraggingCard: function () { return undefined; }
});
var KanbanProvider = function (_a) {
    var children = _a.children;
    var _b = useState(false), isDraggingColumn = _b[0], setIsDraggingColumn = _b[1];
    var _c = useState(false), isDraggingCard = _c[0], setIsDraggingCard = _c[1];
    return (jsx(KanbanContext.Provider, __assign({ value: { isDraggingColumn: isDraggingColumn, setIsDraggingColumn: setIsDraggingColumn, isDraggingCard: isDraggingCard, setIsDraggingCard: setIsDraggingCard } }, { children: children }), void 0));
};
var useKanbanContext = function () { return useContext(KanbanContext); };

var COLUMN_TYPE = 'kanban-column';
var CARD_TYPE = 'kanban-card';

function useCard(id) {
    var context = useKanbanContext();
    var cardRef = useRef(null);
    var _a = useDrag(function () { return ({
        type: CARD_TYPE,
        item: function () {
            context.setIsDraggingCard(true);
            return ({ id: id, sourceBoundingClientRect: cardRef.current.getBoundingClientRect() });
        },
        collect: function (monitor) { return ({
            item: monitor.getItem()
        }); },
        end: function () {
            context.setIsDraggingCard(false);
        }
    }); }, [id]), item = _a[0].item, drag = _a[1];
    drag(cardRef);
    useEffect(function () { cardRef.current.setAttribute('data-kanban-card-id', id); }, []);
    return ([cardRef, { isDragging: (item === null || item === void 0 ? void 0 : item.id) === id }]);
}

function useCardDrop(_a) {
    var onDrop = _a.onDrop;
    var dropRef = useRef(null);
    var _b = useDrop(function () { return (__assign(__assign({ accept: CARD_TYPE }, (onDrop && { drop: function (item) { return onDrop(item); } })), { collect: function (monitor) { return ({
            item: monitor.getItem(),
            isOver: monitor.isOver(),
        }); } })); }), _c = _b[0], item = _c.item, isOver = _c.isOver, drop = _b[1];
    drop(dropRef);
    return [dropRef, { item: item, isOver: isOver }];
}

var getVerticalIndex = (function (cardId, cards, offset, placeholder) {
    var cardsRect = cards.getBoundingClientRect();
    var pointerY = offset.y - cardsRect.top;
    // find the index to drop the card
    var i = 0;
    var index = 0;
    while (i < cards.children.length) {
        var child = cards.children[i];
        if (child !== placeholder) {
            var childRect = child.getBoundingClientRect();
            var childY = childRect.top + childRect.height / 2 - cardsRect.top;
            if (pointerY < childY) {
                break;
            }
            index = index + 1;
        }
        i = i + 1;
    }
    // if the index is on top the same card that is dragging
    // then make the index null
    if (isCardId(cardId, cards, index - 1) || isCardId(cardId, cards, i)) {
        index = null;
    }
    // return the index
    return index;
});
// utilities
var isCardId = function (cardId, cards, index) {
    return index >= 0 && index < cards.children.length && cards.children[index].getAttribute('data-kanban-card-id') === cardId;
};

function useCards(columnId, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.moveCard, moveCard = _c === void 0 ? function () { return null; } : _c;
    var cardsRef = useRef(null);
    var placeholderRef = useRef(null);
    var clientOffset = useRef(null);
    var cardsScrollTop = useRef(0);
    var _d = useState(null), placeholderIndex = _d[0], setPlaceholderIndex = _d[1];
    var _e = useDrop(function () { return ({
        accept: CARD_TYPE,
        hover: function (item, monitor) {
            var offset = monitor.getClientOffset();
            var scrollTop = cardsScrollTop.current;
            if (offset !== null && (clientOffset.current === null ||
                clientOffset.current.x !== offset.x || clientOffset.current.y !== offset.y ||
                cardsRef.current.scrollTop !== scrollTop)) {
                var index = getVerticalIndex(item.id, cardsRef.current, offset, placeholderRef.current);
                setPlaceholderIndex(index);
                clientOffset.current = offset;
                cardsScrollTop.current = cardsRef.current.scrollTop;
            }
        },
        drop: function (item, monitor) {
            if (placeholderIndex != null) {
                moveCard(item.id, columnId, placeholderIndex);
            }
        },
        collect: function (monitor) { return ({
            item: monitor.getItem(),
            isOver: monitor.isOver(),
        }); }
    }); }, [columnId, moveCard, placeholderIndex]), _f = _e[0], item = _f.item, isOver = _f.isOver, drop = _e[1];
    drop(cardsRef);
    return [cardsRef, placeholderRef, { item: item, isOver: isOver, canDrop: isOver && (placeholderIndex != null), placeholderIndex: isOver ? placeholderIndex : null }];
}

function useColumn(id) {
    var context = useKanbanContext();
    var columnRef = useRef(null);
    var _a = useDrag(function () { return ({
        type: COLUMN_TYPE,
        item: function () {
            context.setIsDraggingColumn(true);
            return ({ id: id, sourceBoundingClientRect: columnRef.current.getBoundingClientRect() });
        },
        collect: function (monitor) { return ({
            item: monitor.getItem()
        }); },
        end: function () {
            context.setIsDraggingColumn(false);
        }
    }); }, [id]), item = _a[0].item, drag = _a[1];
    drag(columnRef);
    useEffect(function () { columnRef.current.setAttribute('data-kanban-column-id', id); }, []);
    return ([columnRef, { isDragging: (item === null || item === void 0 ? void 0 : item.id) === id }]);
}

function useColumnDrop(_a) {
    var onDrop = _a.onDrop;
    var dropRef = useRef(null);
    var _b = useDrop(function () { return (__assign(__assign({ accept: COLUMN_TYPE }, (onDrop && { drop: function (item) { return onDrop(item); } })), { collect: function (monitor) { return ({
            item: monitor.getItem(),
            isOver: monitor.isOver(),
        }); } })); }), _c = _b[0], item = _c.item, isOver = _c.isOver, drop = _b[1];
    drop(dropRef);
    return [dropRef, { item: item, isOver: isOver }];
}

var getHorizontalIndex = (function (cardId, columns, offset, placeholder) {
    var columnsRect = columns.getBoundingClientRect();
    var pointerX = offset.x - columnsRect.left;
    // find the index to drop the column
    var i = 0;
    var index = 0;
    while (i < columns.children.length) {
        var child = columns.children[i];
        if (child !== placeholder) {
            var childRect = child.getBoundingClientRect();
            var childX = childRect.left + childRect.width / 2 - columnsRect.left;
            if (pointerX < childX) {
                break;
            }
            index = index + 1;
        }
        i = i + 1;
    }
    // if the index is on top the same column that is dragging
    // then make the index null
    if (isColumnId(cardId, columns, index - 1) || isColumnId(cardId, columns, i)) {
        index = null;
    }
    // return the index
    return index;
});
// utilities
var isColumnId = function (columnId, columns, index) {
    return index >= 0 && index < columns.children.length && columns.children[index].getAttribute('data-kanban-column-id') === columnId;
};

function useColumns(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.moveColumn, moveColumn = _c === void 0 ? function () { return null; } : _c;
    var columnsRef = useRef(null);
    var placeholderRef = useRef(null);
    var clientOffset = useRef(null);
    var columnScrollLeft = useRef(0);
    var _d = useState(null), placeholderIndex = _d[0], setPlaceholderIndex = _d[1];
    var _e = useDrop(function () { return ({
        accept: COLUMN_TYPE,
        hover: function (item, monitor) {
            var offset = monitor.getClientOffset();
            var scrollLeft = columnScrollLeft.current;
            if (offset !== null && (clientOffset.current === null ||
                clientOffset.current.x !== offset.x || clientOffset.current.y !== offset.y ||
                columnsRef.current.scrollLeft !== scrollLeft)) {
                var index = getHorizontalIndex(item.id, columnsRef.current, offset, placeholderRef.current);
                setPlaceholderIndex(index);
                clientOffset.current = offset;
                columnScrollLeft.current = columnsRef.current.scrollLeft;
            }
        },
        drop: function (item, monitor) {
            if (placeholderIndex != null) {
                moveColumn(item.id, placeholderIndex);
            }
        },
        collect: function (monitor) { return ({
            item: monitor.getItem(),
            isOver: monitor.isOver()
        }); }
    }); }, [moveColumn, placeholderIndex]), _f = _e[0], item = _f.item, isOver = _f.isOver, drop = _e[1];
    drop(columnsRef);
    return [columnsRef, placeholderRef, { item: item, isOver: isOver, canDrop: isOver && (placeholderIndex != null), placeholderIndex: isOver ? placeholderIndex : null }];
}

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
var DatePicker = React.forwardRef(function (_a, ref) {
    var name = _a.name, defaultValue = _a.defaultValue, value = _a.value, onChange = _a.onChange, _b = _a.shortcuts, shortcuts = _b === void 0 ? false : _b, _c = _a.parseDate, parseDate = _c === void 0 ? internalParseDate : _c, _d = _a.formatDate, formatDate = _d === void 0 ? internalFormatDate : _d, _e = _a.firstDayOfWeek, firstDayOfWeek = _e === void 0 ? 0 : _e, props = __rest(_a, ["name", "defaultValue", "value", "onChange", "shortcuts", "parseDate", "formatDate", "firstDayOfWeek"]);
    var _f = useTranslation(), t = _f.t, ready = _f.ready;
    var inputRef = useRef(null);
    useImperativeHandle(ref, function () { return inputRef.current; });
    // Maintain an internalValue to use the internal input as controlled,
    // and only update internalValue only when the DatePicker is controlled.
    var controlled = useState(value != null)[0];
    var _g = useState(defaultValue || ''), internalValue = _g[0], setInternalValue = _g[1];
    useEffect(function () { if (controlled) {
        setInternalValue(value || '');
    } }, [controlled, value]);
    // Calendar is the normalized first date having the week of the current date
    // starting at the firstDayOfWeek
    // (has day = 1, hour = 12, minute = 0, second = 0 and millis = 0)
    var _h = useState(startOfMonth(parseDate(defaultValue || ''))), calendar = _h[0], setCalendar = _h[1];
    useEffect(function () { return setCalendar(startOfMonth(parseDate(internalValue))); }, [internalValue]);
    // Popper states
    var _j = useState(false), show = _j[0], setShow = _j[1];
    var _k = useState(null), target = _k[0], setTarget = _k[1];
    var _l = useState(null), popper = _l[0], setPopper = _l[1];
    useOnOutsideClick(function () { if (show) {
        setShow(!show);
    } }, show, target, popper);
    // handlers
    var handleShow = function () { if (!show) {
        setShow(true);
    } };
    var handleHide = function () { if (show) {
        setShow(false);
    } };
    var handleFocus = handleShow;
    var handleBlur = function (e) {
        handleFinalValue();
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 9: // tab
            case 13: // enter
                handleFinalValueDate(parseDate(internalValue));
                break;
            default:
                handleShow();
        }
    };
    var handleChange = function (e) {
        if (onChange) {
            // bubble up change event regardless of 
            // controlled or uncontrolled
            onChange(e);
        }
        if (value == null) {
            // set internal value if uncontrolled
            setInternalValue(e.target.value);
        }
    };
    // navigation
    var handleClickPrevMonth = function () {
        var c = new Date(calendar);
        c.setMonth(c.getMonth() - 1);
        setCalendar(c);
    };
    var handleClickToday = function () {
        var c = new Date();
        c.setDate(1);
        c.setHours(12, 0, 0, 0);
        setCalendar(c);
    };
    var handleClickNextMonth = function () {
        var c = new Date(calendar);
        c.setMonth(c.getMonth() + 1);
        setCalendar(c);
    };
    var handleClickDate = function (e, d) {
        handleFinalValueDate([d.getFullYear(), d.getMonth(), d.getDate()]);
        handleHide();
    };
    // handle final values
    var handleFinalValue = function () {
        var finalDate = parseDate(internalValue);
        handleFinalValueDate(finalDate);
    };
    var handleFinalValueDate = function (finalDate) {
        var finalValue = finalDate != null ? formatDate(finalDate) : '';
        setFinalInputValue(finalValue);
        handleHide();
    };
    var setFinalInputValue = function (inputValue) {
        var _a;
        var setter = (_a = Object === null || Object === void 0 ? void 0 : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')) === null || _a === void 0 ? void 0 : _a.set;
        if (setter && inputValue !== '') {
            setter.call(inputRef.current, inputValue);
            inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
        }
    };
    // setup
    var today = new Date();
    today.setHours(12, 0, 0, 0);
    var v = parseDate(internalValue);
    var selected = v ? new Date(v[0], v[1], v[2], 12, 0, 0, 0) : null;
    // calculate weeks
    var weeks = useMemo(function () {
        var first = new Date(calendar.getTime());
        first.setDate(1 - first.getDay() + firstDayOfWeek); // beginning of week containing beginning of month
        var weeks = [];
        for (var i = 0; i < 6; i++) {
            var dates = [];
            for (var j = 0; j < 7; j++, first.setDate(first.getDate() + 1)) {
                dates.push(new Date(first.getTime()));
            }
            weeks.push(dates);
        }
        return weeks;
    }, [calendar.getTime()]);
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
    var months = ready ? t('months', { defaultValue: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], returnObjects: true }) : null;
    var days = ready ? t('shortDays', { defaultValue: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], returnObjects: true }) : [];
    return (jsxs("div", __assign({ className: "relative" }, { children: [jsx("div", __assign({ ref: setTarget }, { children: jsx(Input, __assign({ type: "text", ref: inputRef, name: name, defaultValue: defaultValue, value: value, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, onMouseDown: handleFocus, onKeyDown: handleKeyDown, autoComplete: "off" }, props), void 0) }), void 0), ready && show &&
                jsx("div", __assign({ ref: setPopper, onMouseDown: function (e) { e.preventDefault(); }, className: "absolute left-0 mt-1 bg-content-fg border border-content-border rounded overflow-hidden z-10" }, { children: jsxs("div", __assign({ className: "flex flex-row" }, { children: [jsxs("div", { children: [jsxs("div", __assign({ className: "px-2 py-1 flex flex-row items-center justify-between bg-gray-400" }, { children: [jsxs("div", __assign({ className: "flex-grow text-center font-bold" }, { children: [months[calendar.getMonth()], " ", calendar.getFullYear()] }), void 0), jsxs("div", __assign({ className: "flex-none space-x-2" }, { children: [jsx("button", __assign({ type: "button", className: "focus:outline-none", onClick: handleClickPrevMonth }, { children: jsx(SvgAngleLeftIcon, { className: "text-content stroke-current stroke-2" }, void 0) }), void 0), jsx("button", __assign({ type: "button", className: "focus:outline-none", onClick: handleClickToday }, { children: jsx(SvgCircleIcon, { className: "text-content stroke-current stroke-2" }, void 0) }), void 0), jsx("button", __assign({ type: "button", className: "focus:outline-none", onClick: handleClickNextMonth }, { children: jsx(SvgAngleRightIcon, { className: "text-content stroke-current stroke-2" }, void 0) }), void 0)] }), void 0)] }), void 0), jsxs("table", __assign({ className: "table-fixed text-center", style: { width: '21em' } }, { children: [jsx("thead", { children: jsx("tr", { children: weeks[0].map(function (d, i) { return jsx("th", __assign({ className: "", style: { padding: '0 0.5em', width: '3em' } }, { children: days[d.getDay()] }), i); }) }, void 0) }, void 0), jsx("tbody", __assign({ className: "cursor-pointer" }, { children: weeks.map(function (w) {
                                                    return jsx("tr", { children: w.map(function (d) { return jsx("td", __assign({ onClick: function (e) { return handleClickDate(e, d); }, className: dayClasses(d) }, { children: d.getDate() }), d.getTime()); }) }, w[0].getTime());
                                                }) }), void 0)] }), void 0)] }, void 0), shortcuts &&
                                jsx("div", __assign({ className: "flex flex-col justify-between items-stretch bg-gray-300 cursor-pointer" }, { children: namedDays.map(function (s, i) { return jsx("div", __assign({ onClick: function (e) { return handleClickDate(e, s.date(new Date(today))); }, className: "px-2 truncate hover:text-white hover:bg-secondary-500" }, { children: t("namedDays." + s.label, { defaultValue: s.label }) }), i); }) }), void 0)] }), void 0) }), void 0)] }), void 0));
});
//
// utilities
//
/**
 * Return a date representing the first date of the parsed value or the first
 * date of the current month if the parsed value is invalid.
 *
 * @param {String} s - The string to parse
 */
function startOfMonth(date) {
    var start = date ? new Date(date[0], date[1], date[2]) : new Date();
    start.setHours(12, 0, 0, 0);
    start.setDate(1);
    return start;
}
//
// default parse and format
//
/**
 * Parses a simple date in the format dd-mm-yyyy.
 * It is very lininent because it parses correctly dd, dd-mm, and dd-mm-yyyy.
 * It assumes the current date's month and year in the cases of an incomplete date.
 *
 * @param {String} s - The string to parse
 * @return {Array [ y, m, d ]} - The date represented as an array with a 0 based month
 */
function internalParseDate(s) {
    var parse = /^\s*([0-3]?\d)(?:-(?:([0-1]?\d)?(?:-(\d{4})?)?)?)?\s*$/i.exec(s);
    if (parse) {
        var now = new Date();
        var d = +parse[1];
        var m = parse[2] ? +parse[2] - 1 : now.getMonth();
        var y = parse[3] ? +parse[3] : now.getFullYear();
        var valid = new Date(y, m, d, 12, 0, 0, 0);
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
function internalFormatDate(ymd) {
    var m = ymd[1] + 1;
    return (ymd[2] < 10 ? '0' + ymd[2] : ymd[2]) + '-' + (m < 10 ? '0' + m : m) + '-' + ymd[0];
}

//
// https://popper.js.org/docs/v2/modifiers/community-modifiers/
// https://codesandbox.io/s/bitter-sky-pe3z9?file=/src/index.js:383-394
//
var sameWidth = {
    name: 'sameWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: function (_a) {
        var state = _a.state;
        state.styles.popper.width = state.rects.reference.width + "px";
    },
    effect: function (_a) {
        var state = _a.state;
        state.elements.popper.style.width = state.elements.reference.offsetWidth + "px";
    }
};

/* eslint-disable import/no-anonymous-default-export */
var swatches = [
    '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
    '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
    '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6',
    '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'
];

var placements = {
    'start': 'bottom-start',
    'stretch': 'bottom',
    'end': 'bottom-end'
};
var SwatchPicker = React.forwardRef(function (_a, ref) {
    var _b = _a.swatches, values = _b === void 0 ? swatches : _b, _c = _a.align, align = _c === void 0 ? 'stretch' : _c, _d = _a.popperClassName, popperClassName = _d === void 0 ? 'grid grid-cols-5 w-32 overflow-hidden' : _d, onFocus = _a.onFocus, onBlur = _a.onBlur, props = __rest(_a, ["swatches", "align", "popperClassName", "onFocus", "onBlur"]);
    var _e = useState(false), visible = _e[0], setVisible = _e[1];
    var _f = useState(null), target = _f[0], setTarget = _f[1];
    var _g = useState(null), popper = _g[0], setPopper = _g[1];
    useOnOutsideClick(function () { return visible && setVisible(false); }, visible, target, popper);
    useImperativeHandle(ref, function () { return target; });
    var _h = usePopper(target, popper, {
        placement: placements[align],
        modifiers: __spreadArray([
            { name: 'offset', options: { offset: [0, 4] } }
        ], (align === 'stretch' ? [sameWidth] : []))
    }), styles = _h.styles, attributes = _h.attributes;
    function handleOnFocus(event) {
        if (onFocus) {
            onFocus(event);
        }
        setVisible(true);
    }
    function handleOnBlur(event) {
        setVisible(false);
        if (onBlur) {
            onBlur(event);
        }
    }
    function setValue(event, element, swatch) {
        var _a;
        event.preventDefault();
        event.stopPropagation();
        var inputSetter = (_a = Object === null || Object === void 0 ? void 0 : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')) === null || _a === void 0 ? void 0 : _a.set;
        if (inputSetter) {
            inputSetter.call(element, swatch);
            var inputEvent = new Event('input', { bubbles: true });
            element.dispatchEvent(inputEvent);
            element.select();
            setVisible(false);
        }
    }
    return (jsxs("div", __assign({ className: "relative inline-block w-full" }, { children: [jsx(Input, __assign({ type: "text", ref: setTarget }, props, { maxLength: 7, onClick: function () { return setVisible(true); }, onFocus: handleOnFocus, onBlur: handleOnBlur }), void 0), jsx("div", { className: "m-px absolute inset-y-0 right-0 rounded bg-red-500", style: { width: '2.5em', backgroundColor: target === null || target === void 0 ? void 0 : target.value } }, void 0), visible && ReactDOM.createPortal(jsx("div", __assign({ ref: setPopper }, attributes.popper, { className: classnames('border border-control-border rounded', 'bg-white cursor-pointer', popperClassName), style: styles.popper }, { children: values.map(function (s, i) {
                    return jsx("div", __assign({ onMouseDown: function (e) { return setValue(e, target, s); }, style: { backgroundColor: s } }, { children: "\u00A0" }), i);
                }) }), void 0), document.querySelector('body'))] }), void 0));
});

/**
 * TagPicker creates an input to choose from a searchable tag store of type `T`.
 * It takes an array of tags of type `T[]` as `values`, which is the current set
 * of tags, and fires `onAdd(tag: T)` and `onRemove(tag: T)` to update the
 * `values` array. Both `onAdd` and `onRemove` are treated as promises and while
 * they are being resolved the component is shown in a `loading` state.
 *
 * This components requires that its `values` are complete `T`'s and that the
 * store returns complete `T`'s. At least sufficient `T` so that `renderTag` can
 * actually render it.
 *
 * The tag store is accessed and managed via `onSearch(q: string)` and
 * `onCreate(q: string)`. The `onSearch` property should return `T[]` or
 * `Promise<T[]>` and inside the component is used as
 * `Promise.resolve(onSearch(q))`. If `onCreate` is provided then, whenever a
 * search for tags is being done and no results are provided form `onSearch`, a
 * button with the text `Create tag ${q}` will be shown. When the button is
 * pressed, `onCreate(q)` is fired and the store should include the newly
 * created tag and the `values` property should be updated (with the same logic
 * as `onAdd`). Both `onSearch` and `onCreate` are treated as promises and while
 * they are being resolved the component is shown in a `loading` state.
 *
 */
var TagPicker = function (_a) {
    var tags = _a.tags, tagValue = _a.tagValue, renderTag = _a.renderTag, onAdd = _a.onAdd, onRemove = _a.onRemove, onSearch = _a.onSearch, CreateComponent = _a.CreateComponent;
    useContext(Context$4);
    var _b = useState(false), isVisible = _b[0], setIsVisible = _b[1];
    var _c = useState(false), isUpdating = _c[0], setIsUpdating = _c[1];
    var _d = useState(false); _d[0]; var setIsError = _d[1];
    var searchRef = useRef();
    var _e = useState(null), target = _e[0], setTarget = _e[1];
    var _f = useState(null), popper = _f[0], setPopper = _f[1];
    useOnOutsideClick(function () { if (isVisible) {
        setIsVisible(false);
    } }, isVisible, target, popper);
    var _g = useState(''), search = _g[0], setSearch = _g[1];
    var _h = useState([]), searchResults = _h[0], setSearchResults = _h[1];
    useEffect(function () { if (isVisible) {
        searchRef.current.focus();
    } }, [isVisible]);
    // 
    var show = function () {
        if (!isVisible) {
            setIsVisible(true);
            setSearch('');
            setSearchResults([]);
        }
    };
    var clean = function () {
        setSearch('');
        setSearchResults([]);
        setIsUpdating(false);
        searchRef.current.focus();
    };
    // collection methods
    var handleAdd = function (tag) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsUpdating(true);
                    return [4 /*yield*/, onAdd(tag)];
                case 1:
                    _a.sent();
                    clean();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleRemove = function (item) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsUpdating(true);
                    return [4 /*yield*/, onRemove(item)];
                case 1:
                    _a.sent();
                    setIsUpdating(false);
                    return [2 /*return*/];
            }
        });
    }); };
    // search methods
    var doSearch = _debounce(function (q) { return __awaiter(void 0, void 0, void 0, function () {
        var results, tagValues_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsUpdating(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, Promise.resolve(onSearch(q))];
                case 2:
                    results = _a.sent();
                    tagValues_1 = new Set(tags.map(tagValue));
                    setSearchResults(results.filter(function (tag) { return !tagValues_1.has(tagValue(tag)); }));
                    return [3 /*break*/, 5];
                case 3:
                    _a.sent();
                    setIsError(true);
                    return [3 /*break*/, 5];
                case 4:
                    setIsUpdating(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, 200);
    var handleSearch = function (e) {
        setSearch(e.target.value);
        doSearch(e.target.value);
    };
    var handleSubmit = function (create) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsUpdating(true);
                    return [4 /*yield*/, Promise.resolve(create)];
                case 1:
                    _a.sent();
                    clean();
                    return [2 /*return*/];
            }
        });
    }); };
    // render
    return (jsxs("div", __assign({ className: classnames('relative w-full') }, { children: [jsxs("div", __assign({ ref: setTarget, tabIndex: isVisible ? -1 : 0, onClick: show, onFocus: show, className: classnames('relative w-full lux-tag-space', 'rounded border border-control-border', 'focus:border-primary-500 focus:ring focus:ring-primary-500', 'focus:ring-opacity-50 focus:outline-none'), style: { padding: '0.5em 2.75em 0.5em 0.75em' } }, { children: [(tags.length > 0) ?
                        tags.map(function (tag) {
                            return jsx(React.Fragment, { children: renderTag(tag, (isVisible ? function () { return handleRemove(tag); } : undefined)) }, tagValue(tag));
                        }) :
                        jsx("span", { children: "\u00A0Placeholder" }, void 0), jsx("div", __assign({ className: "absolute inset-y-0 right-0 flex flex-row justify-center items-center cursor-pointer", style: { width: '2em' } }, { children: isUpdating ?
                            jsx(Loading, {}, void 0) :
                            jsx(SvgAngleDownIcon, { width: "1em", height: "1em", className: "inline text-control-border stroke-current stroke-2" }, void 0) }), void 0)] }), void 0), isVisible &&
                jsxs("div", __assign({ ref: setPopper, className: classnames('absolute w-full max-h-72 overflow-auto', 'mt-2 space-y-2', 'bg-white', 'rounded border border-control-border'), style: { padding: '0.5em 0.75em 0.5em 0.75em' } }, { children: [jsx(SearchInput, { ref: searchRef, value: search, onChange: handleSearch }, void 0), (searchResults.length > 0) &&
                            jsx("ul", __assign({ className: "space-y-1" }, { children: searchResults.map(function (tag) {
                                    return jsx("li", __assign({ onClick: function () { return handleAdd(tag); }, className: "cursor-pointer" }, { children: renderTag(tag) }), tagValue(tag));
                                }) }), void 0), (search && searchResults.length === 0 && CreateComponent) &&
                            jsx(CreateComponent, { search: search, disabled: isUpdating, onSubmit: handleSubmit }, void 0)] }), void 0)] }), void 0));
};

// constants
var morning = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var noon = [12];
var afternoon = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var minutes = [15, 30, 45];
/**
 * TimePicker. Select a time with one click.
 */
var TimePicker = React.forwardRef(function (_a, ref) {
    var name = _a.name, defaultValue = _a.defaultValue, value = _a.value, onChange = _a.onChange, _b = _a.parseTime, parseTime = _b === void 0 ? internalParseTime : _b, _c = _a.formatHour, formatHour = _c === void 0 ? internalFormatHour : _c, _d = _a.formatTime, formatTime = _d === void 0 ? internalFormatTime : _d, props = __rest(_a, ["name", "defaultValue", "value", "onChange", "parseTime", "formatHour", "formatTime"]);
    var _e = useTranslation(), t = _e.t; _e.ready;
    var inputRef = useRef(null);
    useImperativeHandle(ref, function () { return inputRef.current; });
    // Maintain an internalValue to use the internal input as controlled,
    // and only update internalValue only when the DatePicker is controlled.
    var controlled = useState(value != null)[0];
    var _f = useState(defaultValue || ''), internalValue = _f[0], setInternalValue = _f[1];
    useEffect(function () { if (controlled) {
        setInternalValue(value || '');
    } }, [controlled, value]);
    // 
    var times = useRef({ watch: 8 });
    var timesRef = useRef(null);
    useEffect(function () { scroll(); });
    // Popper states
    var _g = useState(false), show = _g[0], setShow = _g[1];
    var _h = useState(null), target = _h[0], setTarget = _h[1];
    var _j = useState(null), popper = _j[0], setPopper = _j[1];
    useOnOutsideClick(function () { if (show) {
        setShow(false);
    } }, show, target, popper);
    // handlers
    var handleShow = function () { if (!show) {
        setShow(true);
    } };
    var handleHide = function () { if (show) {
        setShow(false);
    } };
    var handleFocus = handleShow;
    var handleBlur = function (e) {
        handleFinalValue();
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 9: // tab
            case 13: // enter
                handleFinalValueTime(parseTime(internalValue));
                break;
            default:
                handleShow();
        }
    };
    var handleChange = function (e) {
        if (onChange) {
            // bubble up change event regardless of 
            // controlled or uncontrolled
            onChange(e);
        }
        if (value == null) {
            // set internal value if uncontrolled
            setInternalValue(e.target.value);
        }
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
    var handleClickTime = function (e, time) {
        handleFinalValueTime(time);
        handleHide();
    };
    var scroll = function () {
        if (timesRef.current) {
            var t_1 = timesRef.current;
            var h = t_1.scrollHeight / 24;
            t_1.scrollTop = times.current.watch * h;
        }
    };
    // handle final values
    var handleFinalValue = function () {
        var finalTime = parseTime(internalValue);
        handleFinalValueTime(finalTime);
    };
    var handleFinalValueTime = function (finalTime) {
        var finalValue = finalTime != null ? formatTime(finalTime) : '';
        setFinalInputValue(finalValue);
        handleHide();
    };
    var setFinalInputValue = function (inputValue) {
        var _a;
        var setter = (_a = Object === null || Object === void 0 ? void 0 : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')) === null || _a === void 0 ? void 0 : _a.set;
        if (setter && inputValue !== '') {
            setter.call(inputRef.current, inputValue);
            inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
        }
    };
    // setup
    var now = new Date();
    now.getHours();
    var v = parseTime(internalValue);
    var selected = v ? v : [-1, -1];
    // format
    function hourClasses(time) {
        if (time[0] === selected[0]) {
            return 'text-white bg-primary-500 group hover:bg-secondary-300';
        }
        if (time[0] === now.getHours()) {
            return 'text-white bg-info-500 group hover:bg-secondary-300';
        }
        return 'group hover:bg-secondary-300';
    }
    function hourMinuteClasses(time) {
        if (time[0] === selected[0]) {
            if (time[1] === selected[1]) {
                return 'text-xs text-white group-hover:text-content hover:bg-secondary-500';
            }
            else {
                return 'text-xs text-primary-500 group-hover:text-content hover:bg-secondary-500';
            }
        }
        if (time[0] === now.getHours()) {
            return 'text-xs text-white group-hover:text-content hover:bg-secondary-500';
        }
        return 'text-xs text-muted group-hover:text-content hover:bg-secondary-500';
    }
    // render
    return (jsxs("div", __assign({ className: "relative" }, { children: [jsx("div", __assign({ ref: setTarget }, { children: jsx(Input, __assign({ type: "text", ref: inputRef, name: name, defaultValue: defaultValue, value: value, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, onMouseDown: handleFocus, onKeyDown: handleKeyDown, autoComplete: "off" }, props), void 0) }), void 0), show &&
                jsxs("div", __assign({ ref: setPopper, onMouseDown: function (e) { e.preventDefault(); }, className: "absolute left-0 mt-1 bg-content-fg border border-content-border rounded overflow-hidden z-10" }, { children: [jsxs("div", __assign({ className: "px-2 py-1 flex flex-row items-center justify-between bg-gray-400" }, { children: [jsx("div", __assign({ className: "flex-grow text-center font-bold" }, { children: t('hour', { defaultValue: 'Hour' }) }), void 0), jsxs("div", __assign({ className: " flex-none space-x-2" }, { children: [jsx("button", __assign({ type: "button", className: "focus:outline-none", onClick: handleClickPrevHour }, { children: jsx(SvgAngleUpIcon, { className: "text-content stroke-current stroke-2" }, void 0) }), void 0), jsx("button", __assign({ type: "button", className: "focus:outline-none", onClick: handleClickNoon }, { children: jsx(SvgCircleIcon, { className: "text-content stroke-current stroke-2" }, void 0) }), void 0), jsx("button", __assign({ type: "button", className: "focus:outline-none", onClick: handleClickNextHour }, { children: jsx(SvgAngleDownIcon, { className: "text-content stroke-current stroke-2" }, void 0) }), void 0)] }), void 0)] }), void 0), jsx("div", __assign({ ref: timesRef, className: "h-64 overflow-scroll" }, { children: jsxs("table", __assign({ className: "table-fixed text-center", style: { width: '12em' } }, { children: [jsx("thead", { children: jsxs("tr", { children: [jsx("th", { style: { width: '3em' } }, void 0), minutes.map(function (m) { return jsx("td", { className: "w-10", style: { width: '3em' } }, void 0); })] }, void 0) }, void 0), jsx("tbody", __assign({ className: "cursor-pointer" }, { children: morning.map(function (h) {
                                            return jsxs("tr", __assign({ className: hourClasses([h, 0]) }, { children: [jsx("th", __assign({ className: "text-base group-hover:text-content group-hover:bg-secondary-500", onClick: function (e) { return handleClickTime(e, [h, 0]); } }, { children: formatHour(h) }), void 0), minutes.map(function (m) {
                                                        return jsx("td", __assign({ onClick: function (e) { return handleClickTime(e, [h, m]); }, className: hourMinuteClasses([h, m]) }, { children: m }), m);
                                                    })] }), h);
                                        }) }), void 0), jsx("tbody", __assign({ className: "bg-gray-200 cursor-pointer" }, { children: noon.map(function (h) {
                                            return jsxs("tr", __assign({ className: hourClasses([h, 0]) }, { children: [jsx("th", __assign({ className: "text-base group-hover:text-content group-hover:bg-secondary-500", onClick: function (e) { return handleClickTime(e, [h, 0]); } }, { children: formatHour(h) }), void 0), minutes.map(function (m) {
                                                        return jsx("td", __assign({ onClick: function (e) { return handleClickTime(e, [h, m]); }, className: hourMinuteClasses([h, m]) }, { children: m }), m);
                                                    })] }), h);
                                        }) }), void 0), jsx("tbody", __assign({ className: "cursor-pointer" }, { children: afternoon.map(function (h) {
                                            return jsxs("tr", __assign({ className: hourClasses([h, 0]) }, { children: [jsx("th", __assign({ className: "text-base group-hover:text-content group-hover:bg-secondary-500", onClick: function (e) { return handleClickTime(e, [h, 0]); } }, { children: formatHour(h) }), void 0), minutes.map(function (m) {
                                                        return jsx("td", __assign({ onClick: function (e) { return handleClickTime(e, [h, m]); }, className: hourMinuteClasses([h, m]) }, { children: m }), m);
                                                    })] }), h);
                                        }) }), void 0)] }), void 0) }), void 0)] }), void 0)] }), void 0));
});
//
// default parse and format
//
/**
 * Parses a time in the simple format hh:mm(am|pm).
 *
 * @param {String} s - The string to parse
 * @return {Array[h, m]} - The time represented as an array
 */
function internalParseTime(s) {
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
function internalFormatHour(h) {
    return String(h <= 12 ? (h > 0 ? h : 12) : (h - 12));
}
/**
 * Formats a time in the simple format hh:mm(am|pm).
 *
 * @param {Array[h, m]} hm - The time represented as an array
 * @returns {String} s - The formated string
 */
function internalFormatTime(hm) {
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

var CheckBox = React.forwardRef(function (_a, ref) {
    var className = _a.className; _a.children; var props = __rest(_a, ["className", "children"]);
    useContext(Context$4);
    return (jsx("input", __assign({ ref: ref, type: "checkbox" }, props, { className: classnames('text-primary-500', 'border border-control-border checked:border-control-border', 'focus:border-primary-500', 'focus:ring focus:ring-primary-500 focus:ring-opacity-50 focus:ring-offset-0', 'disabled:opacity-50', 'rounded', className), style: { width: '1.25em', height: '1.25em', verticalAlign: '-0.25em' } }), void 0));
});

// import check from '../../icons/check-icon.svg';
'data:image/svg+xml;base64,' + window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="25,9 13.3,23 7,15.3 "/></svg>');
'data:image/svg+xml;base64,' + window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="8" x2="24" y2="24"/><line x1="24" y1="8" x2="8" y2="24"/></svg>');
var CheckButton = function (_a) {
    var onFulfill = _a.onFulfill, onReject = _a.onReject, dataTooltip = _a["data-tooltip"], dataTooltipFulfill = _a["data-tooltip-fulfill"], dataTooltipReject = _a["data-tooltip-reject"];
    return (jsxs("div", __assign({ tabIndex: 0, "data-tooltip": dataTooltip, className: classnames('inline-block relative', 'border border-control-border checked:border-control-border', 'focus:border-primary-500', 'focus:ring focus:ring-primary-500 focus:ring-opacity-50 focus:ring-offset-0', 'disabled:opacity-50', 'rounded'), style: { width: '2.5em', height: '1.25em', verticalAlign: '-0.25em' } }, { children: [jsx("button", __assign({ tabIndex: -1, onClick: onFulfill, "data-tooltip": dataTooltipFulfill, className: classnames('absolute inset-y-0 left-0 w-1/2', 'hover:bg-primary-600', 'border-r border-control-border checked:border-control-border', 'rounded') }, { children: jsx(SvgCheckIcon, { className: "m-auto hover:text-white hover:stroke-2", style: { width: '1em', height: '1em' } }, void 0) }), void 0), jsx("button", __assign({ tabIndex: -1, onClick: onReject, "data-tooltip": dataTooltipReject, className: classnames('absolute inset-y-0 right-0 w-1/2', 'rounded') }, { children: jsx(SvgCrossIcon, { className: "m-auto text-transparent stroke-2 hover:text-danger-500", style: { width: '1em', height: '1em' } }, void 0) }), void 0)] }), void 0));
};

var Radio = React.forwardRef(function (_a, ref) {
    var scale = _a.scale; _a.error; var className = _a.className, children = _a.children, props = __rest(_a, ["scale", "error", "className", "children"]);
    var context = useContext(Context$4);
    return children ?
        (jsxs("div", __assign({ className: "flex flex-row items-center" }, { children: [jsx("input", __assign({ type: "radio", ref: ref }, props, { className: classnames(className, controlSize[scale || context.scale || 'base'], 'border border-control-border checked:border-control-border text-primary-500', 'focus:border-primary-500 focus:ring focus:ring-primary-500', 'focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50') }), void 0), jsx("span", __assign({ className: classnames('ml-2', controlText[scale || context.scale || 'base'], className) }, { children: children }), void 0)] }), void 0))
        :
            (jsx("input", __assign({ type: "radio", ref: ref }, props, { className: classnames(className, controlSize[scale || context.scale || 'base'], 'border border-control-border checked:border-control-border text-primary-500', 'focus:border-primary-500 focus:ring focus:ring-primary-500', 'focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50') }), void 0));
});

var Select = React.forwardRef(function (_a, ref) {
    var scale = _a.scale, className = _a.className, children = _a.children, props = __rest(_a, ["scale", "className", "children"]);
    var context = useContext(Context$4);
    return (jsx("select", __assign({}, props, { ref: ref, className: classnames(controlScale[scale || context.scale || 'base'], 'block w-full rounded border border-control-border', 'focus:border-primary-500 focus:ring focus:ring-primary-500', 'focus:ring-opacity-50 focus:outline-none disabled:opacity-50', className) }, { children: children }), void 0));
});
Select.Option = function (_a) {
    var value = _a.value, children = _a.children;
    return (jsx("option", __assign({ value: value }, { children: children }), void 0));
};

var TextArea = React.forwardRef(function (_a, ref) {
    var scale = _a.scale, error = _a.error, className = _a.className, style = _a.style, props = __rest(_a, ["scale", "error", "className", "style"]);
    var context = useContext(Context$4);
    return (jsx("textarea", __assign({}, props, { ref: ref, className: classnames(controlText[scale || context.scale || 'base'], 'block w-full rounded border border-control-border', error || context.error ?
            'border-danger-500 focus:border-danger-500 focus:ring focus:ring-danger-500' :
            'focus:border-primary-500 focus:ring focus:ring-primary-500', 'focus:ring-opacity-50 focus:outline-none disabled:opacity-50', className), style: __assign({ padding: '0.5em 0.75em 0.5em 0.75em' }, style) }), void 0));
});

var Context$1 = createContext({ scale: 'base', value: [], onChange: function () { return null; } });
var RadioBar = function (_a) {
    var _b = _a.scale, scale = _b === void 0 ? 'base' : _b, value = _a.value, onChange = _a.onChange, className = _a.className, children = _a.children;
    return (jsx(Context$1.Provider, __assign({ value: { scale: scale, value: value, onChange: onChange } }, { children: jsx("div", __assign({ className: classnames(controlText[scale], 'inline-block truncate', 'border border-control-border rounded', className) }, { children: children }), void 0) }), void 0));
};
RadioBar.Option = (function (_a) {
    var value = _a.value, className = _a.className, children = _a.children;
    var context = useContext(Context$1);
    var onClick = function () { return context.onChange(value); };
    return (jsx("div", __assign({ onClick: onClick, className: classnames('inline-block', controlScale[context.scale], 'border-control-border border-r last:border-r-0', {
            'text-white bg-primary-500': context.value === value
        }, 'hover:text-white hover:bg-primary-600', 'cursor-pointer', className) }, { children: children }), void 0));
});
RadioBar.Option.displayName = 'RadioBar.Option';

//
// useViewport
//
var ViewportContext = createContext({ width: 0, height: 0 });
var ViewportProvider = function (_a) {
    var _b = _a.wait, wait = _b === void 0 ? 250 : _b, children = _a.children;
    var _c = useState({ width: window.innerWidth, height: window.innerHeight }), size = _c[0], setSize = _c[1];
    var handleResize = _debounce(function () { return setSize({ width: window.innerWidth, height: window.innerHeight }); }, wait);
    useEffect(function () {
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    });
    return (jsx(ViewportContext.Provider, __assign({ value: size }, { children: children }), void 0));
};
var useViewport = function () { return useContext(ViewportContext); };

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
    return (jsxs(Fragment, { children: [context.navigator && jsx("div", { className: classnames('fixed z-10 inset-0 bg-gray-800 opacity-50 md:hidden'), onClick: function () { return context.setNavigator(false); } }, void 0), jsx("div", __assign({ className: classnames('fixed z-20 inset-y-0 left-0 w-56 transform', context.navigator ? 'translate-x-0' : '-translate-x-56', 'transition duration-700 ease-in-out transition-transform') }, { children: jsx("div", __assign({ className: classnames('h-full flex flex-col text-navigator bg-navigator-bg', className) }, { children: children }), void 0) }), void 0)] }, void 0));
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

export { Avatar, Badge, Button, Card, CheckBox, CheckButton, Choose, ChooseFn, Context$4 as Context, Control, Cross, DatePicker, Delay, Dialog, Header, Helium, Input, KanbanContext, KanbanProvider, Loading, Main, Modal, MoreOptionsButton, Navigator, Panel, Popup, Postit, Radio, RadioBar, RoundButton, Select, SwatchPicker, Tabs, Tag, TagPicker, TextArea, TimePicker, Toast, ToastContainer, ToastContent, ToastProvider, Toggle, ViewportProvider, useCard, useCardDrop, useCards, useColumn, useColumnDrop, useColumns, useKanbanContext, useOnOutsideClick, useToast, useViewport };
//# sourceMappingURL=index.js.map
