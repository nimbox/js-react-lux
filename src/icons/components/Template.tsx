import * as React from "react";
import type { SVGProps } from "react";
const SvgTemplate = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M17.75 23.5h-11a1.5 1.5 0 0 1 0-3h11a1.5 1.5 0 0 1 0 3M13.75 16.5h-7a1.5 1.5 0 0 1 0-3h7a1.5 1.5 0 0 1 0 3M21.75 9.5h-15a1.5 1.5 0 0 1 0-3h15a1.5 1.5 0 0 1 0 3" />
    <path d="M28.5 32h-25C1.57 32 0 30.43 0 28.5v-25C0 1.57 1.57 0 3.5 0h25C30.43 0 32 1.57 32 3.5v25c0 1.93-1.57 3.5-3.5 3.5M3.5 3a.5.5 0 0 0-.5.5v25a.5.5 0 0 0 .5.5h25a.5.5 0 0 0 .5-.5v-25a.5.5 0 0 0-.5-.5z" />
    <circle cx={23.25} cy={15} r={2} />
    <circle cx={23.25} cy={22} r={2} />
  </svg>
);
export default SvgTemplate;
