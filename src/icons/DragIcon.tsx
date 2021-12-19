import * as React from "react";
import { SVGProps } from "react";

const SvgDragIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx={12} cy={8} r={2} />
    <circle cx={20} cy={8} r={2} />
    <circle cx={12} cy={16} r={2} />
    <circle cx={20} cy={16} r={2} />
    <circle cx={12} cy={24} r={2} />
    <circle cx={20} cy={24} r={2} />
  </svg>
);

export default SvgDragIcon;
