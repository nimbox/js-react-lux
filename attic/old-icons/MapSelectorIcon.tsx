import * as React from "react";
import { SVGProps } from "react";

const SvgMapSelectorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 2C10.5 2 6 6.5 6 12s4.5 10 10 10 10-4.5 10-10S21.5 2 16 2zm0 13c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zM16 22v8" />
  </svg>
);

export default SvgMapSelectorIcon;
