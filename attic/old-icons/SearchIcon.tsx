import * as React from "react";
import { SVGProps } from "react";

const SvgSearchIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx={14} cy={14} r={12} />
    <path d="m30 30-7.5-7.5" />
  </svg>
);

export default SvgSearchIcon;
