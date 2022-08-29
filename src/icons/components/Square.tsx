import * as React from "react";
import { SVGProps } from "react";

const SvgSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M23.5 27h-15C6.57 27 5 25.43 5 23.5v-15C5 6.57 6.57 5 8.5 5h15C25.43 5 27 6.57 27 8.5v15c0 1.93-1.57 3.5-3.5 3.5ZM8.5 8c-.275 0-.5.225-.5.5v15c0 .275.225.5.5.5h15c.275 0 .5-.225.5-.5v-15c0-.275-.225-.5-.5-.5h-15Z" />
  </svg>
);

export default SvgSquare;
