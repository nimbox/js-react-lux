import * as React from "react";
import { SVGProps } from "react";

const SvgCalendarIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M6 6h20v20H6zM10 3v6M22 3v6M26 12H6" />
  </svg>
);

export default SvgCalendarIcon;
