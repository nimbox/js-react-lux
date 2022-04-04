import * as React from "react";
import { SVGProps } from "react";

const SvgRefreshIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M24.7 11c-1.3-2.2-3.4-3.9-6.1-4.7-5.3-1.4-10.8 1.8-12.3 7.1S8 24.2 13.4 25.6s10.8-1.7 12.2-7.1" />
    <path d="m25.6 4.7-.9 6.3-6.5.4" />
  </svg>
);

export default SvgRefreshIcon;
