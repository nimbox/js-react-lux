import * as React from "react";
import { SVGProps } from "react";

const SvgMessageIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M6 9h20v14H6z" />
    <path d="m6 9 10 9 10-9M6 23l7.3-7.3M26 23l-7.3-7.3" />
  </svg>
);

export default SvgMessageIcon;
