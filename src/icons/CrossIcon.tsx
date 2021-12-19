import * as React from "react";
import { SVGProps } from "react";

const SvgCrossIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="m8 8 16 16M24 8 8 24" />
  </svg>
);

export default SvgCrossIcon;
