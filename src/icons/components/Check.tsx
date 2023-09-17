import * as React from "react";
import type { SVGProps } from "react";
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="m12 25.5-.057-.001A1.503 1.503 0 0 1 10.8 24.9l-6-8a1.501 1.501 0 0 1 2.4-1.8l4.89 6.52L24.87 7.012a1.5 1.5 0 1 1 2.258 1.974l-14 16A1.5 1.5 0 0 1 12 25.5Z" />
  </svg>
);
export default SvgCheck;
