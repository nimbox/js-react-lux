import * as React from "react";
import { SVGProps } from "react";

const SvgCircleIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx={16} cy={16} r={10} />
  </svg>
);

export default SvgCircleIcon;
