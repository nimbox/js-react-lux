import * as React from "react";
import type { SVGProps } from "react";
const SvgWaffle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <circle cx={8} cy={8} r={2} />
    <circle cx={8} cy={16} r={2} />
    <circle cx={8} cy={24} r={2} />
    <circle cx={16} cy={8} r={2} />
    <circle cx={16} cy={16} r={2} />
    <circle cx={16} cy={24} r={2} />
    <circle cx={24} cy={8} r={2} />
    <circle cx={24} cy={16} r={2} />
    <circle cx={24} cy={24} r={2} />
  </svg>
);
export default SvgWaffle;
