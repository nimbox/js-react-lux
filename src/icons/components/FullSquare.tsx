import * as React from "react";
import type { SVGProps } from "react";
const SvgFullSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.5 32h-25C1.57 32 0 30.43 0 28.5v-25C0 1.57 1.57 0 3.5 0h25C30.43 0 32 1.57 32 3.5v25c0 1.93-1.57 3.5-3.5 3.5M3.5 3a.5.5 0 0 0-.5.5v25a.5.5 0 0 0 .5.5h25a.5.5 0 0 0 .5-.5v-25a.5.5 0 0 0-.5-.5z" />
  </svg>
);
export default SvgFullSquare;
