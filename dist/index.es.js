import React, { useRef, useState, useEffect } from 'react';

var Brand = function () { return (React.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", x: "0px", y: "0px", width: "2rem", height: "2rem", viewBox: "0 0 216.833 227.492", "enable-background": "new 0 0 216.833 227.492" },
    React.createElement("g", { id: "guides" }),
    React.createElement("g", { id: "icon" },
        React.createElement("g", null,
            React.createElement("polygon", { fill: "#F7CE3C", points: "42.111,98.075 108.436,91.603 108.436,106.884" }),
            React.createElement("polygon", { fill: "#FFE6A2", points: "174.76,98.075 108.436,91.603 108.436,106.884" }),
            React.createElement("polygon", { fill: "#00607F", points: "108.436,206.377 108.436,106.432 42.111,98.075 42.111,183.054" }),
            React.createElement("polygon", { fill: "#4EC1E0", points: "85.836,138.691 21.115,123.913 42.048,98.09 107.325,106.292" }),
            React.createElement("polygon", { fill: "#FF4C00", points: "108.396,206.377 108.396,106.432 174.76,98.075 174.722,183.054" }),
            React.createElement("polygon", { fill: "#FFA400", points: "130.995,138.691 195.717,123.913 174.782,98.09 109.504,106.292" })),
        React.createElement("g", null,
            React.createElement("path", { fill: "#FFA400", d: "M111.659,80.687l6.629-59.572h-9.874h-9.871l6.632,59.572c1.07-0.032,2.148-0.055,3.239-0.055 C109.508,80.632,110.586,80.654,111.659,80.687z" }),
            React.createElement("path", { fill: "#FFA400", d: "M162.059,53.946l-12.275-7.089l-15.302,37.132c1.542,0.471,2.991,0.979,4.343,1.526L162.059,53.946z" }),
            React.createElement("path", { fill: "#FFA400", d: "M67.049,46.857l-12.277,7.089l23.234,31.569c1.352-0.547,2.802-1.055,4.344-1.526L67.049,46.857z" }))))); };

// cards
var Cards = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "grid grid-cols-1 gap-3" }, children));
};
var Card = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "bg-content-fg border border-content-border rounded" }, children));
};
Card.Header = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "border-b border-content-border p-3" }, children));
};
Card.Body = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "p-3" }, children));
};

var Dropdown = function (_a) {
    var options = _a.options, _b = _a.key, key = _b === void 0 ? function (option) { return option; } : _b, _c = _a.value, _d = _a.onChange, onChange = _d === void 0 ? function (option) { return null; } : _d, children = _a.children;
    var valueRef = useRef(null);
    var optionsRef = useRef(null);
    var _e = useState(false), visible = _e[0], setVisible = _e[1];
    var handleDocumentClick = function (event) {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            if (valueRef.current && !valueRef.current.contains(event.target)) {
                setVisible(false);
            }
        }
    };
    var handleOptionClick = function (option) {
        onChange(option);
        setVisible(false);
    };
    useEffect(function () {
        document.addEventListener("mousedown", handleDocumentClick);
        return function () {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    });
    return (React.createElement("div", { className: "relative inline" },
        React.createElement("div", { ref: valueRef, className: "flex flex-row justify-between border rounded px-3", onClick: function () { return setVisible(!visible); } },
            React.createElement("div", null, "s"),
            React.createElement("div", null, "s")),
        visible &&
            React.createElement("div", { ref: optionsRef, className: "absolute border rounded bg-white mt-1 left-0 py-1" }, options.map(function (option) {
                return React.createElement("div", { key: key(option), className: "hover:bg-primary hover:text-content-fg px-3", onClick: function () { return handleOptionClick(option); } }, key(option));
            }))));
};

// layout
var Helium = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "relative min-h-screen pl-56" }, children));
};
var Navigator = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "fixed inset-y-0 left-0 w-56 flex flex-col bg-navigator-bg text-navigator" }, children));
};
Navigator.Header = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "h-16 px-3 flex-none flex flex-row items-center justify-between bg-navigator-bg border-b border-navigator-border" }, children));
};
Navigator.Body = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "py-3 flex-grow overflow-scroll" }, children));
};
Navigator.Footer = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "h-16 p-3 flex-none flex flex-row items-center border-t border-navigator-border" }, children));
};
Navigator.Copyright = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "h-8 p-3 flex-none flex flex-row items-center border-t border-navigator-border" }, children));
};
var Content = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "w-full min-h-screen flex flex-col text-content bg-content-bg" }, children));
};
Content.Header = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "h-16 px-3 flex-none flex flex-row items-center justify-between bg-content-fg border-b border-content-border" }, children));
};
Content.Body = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "w-full flex-grow flex flex-row items-stretch" }, children));
};
Content.Main = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "w-2/3 p-3" }, children));
};
Content.Side = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "w-1/3 p-3 bg-content-fg border-l border-content-border" }, children));
};

export { Brand, Card, Cards, Content, Dropdown, Helium, Navigator };
//# sourceMappingURL=index.es.js.map
