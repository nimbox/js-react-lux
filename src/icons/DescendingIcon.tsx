import * as React from "react";
import { SVGProps } from "react";

const SvgDescendingIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M26 6H6M23.5 12.8h-15M21 19.4H11M18.5 26h-5" />
  </svg>
);

export default SvgDescendingIcon;
