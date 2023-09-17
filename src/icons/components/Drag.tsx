import * as React from "react";
import type { SVGProps } from "react";
const SvgDrag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <circle cx={12} cy={8} r={2} />
    <circle cx={12} cy={16} r={2} />
    <circle cx={12} cy={24} r={2} />
    <circle cx={20} cy={8} r={2} />
    <circle cx={20} cy={16} r={2} />
    <circle cx={20} cy={24} r={2} />
  </svg>
);
export default SvgDrag;
