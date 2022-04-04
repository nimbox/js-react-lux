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
    <path d="M26 9H6M23 13.8H9M20 18.4h-8M17 23h-2" />
  </svg>
);

export default SvgDescendingIcon;
