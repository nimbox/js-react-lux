import * as React from "react";
import { SVGProps } from "react";

const SvgCircleMinusFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0Zm6.5 18h-13c-1.1 0-2-.9-2-2s.9-2 2-2h13c1.1 0 2 .9 2 2s-.9 2-2 2Z" />
  </svg>
);

export default SvgCircleMinusFill;
