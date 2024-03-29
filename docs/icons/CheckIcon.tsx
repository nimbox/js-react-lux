import * as React from "react";
import { SVGProps } from "react";

const SvgCheckIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M25 9 13.3 23 7 15.3" />
  </svg>
);

export default SvgCheckIcon;
