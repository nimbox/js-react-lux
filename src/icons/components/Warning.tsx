import * as React from "react";
import type { SVGProps } from "react";
const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M29.5 32h-27c-.794 0-1.468-.355-1.85-.974S.25 29.645.604 28.935L14.212 1.724C14.586.974 15.255.525 16 .525s1.414.448 1.79 1.199l13.605 27.21c.354.71.339 1.473-.044 2.092S30.294 32 29.5 32M3.927 29h24.146L16 4.854z" />
    <path d="M16 20a1.5 1.5 0 0 1-1.5-1.5V14a1.5 1.5 0 0 1 3 0v4.5A1.5 1.5 0 0 1 16 20" />
    <circle cx={16} cy={24} r={2} />
  </svg>
);
export default SvgWarning;
