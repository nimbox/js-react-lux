import * as React from "react";
import { SVGProps } from "react";

const SvgSquareIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M6 6h20v20H6z" />
  </svg>
);

export default SvgSquareIcon;
