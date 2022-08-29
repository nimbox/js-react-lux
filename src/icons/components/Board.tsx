import * as React from "react";
import { SVGProps } from "react";

const SvgBoard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M9 19.5A1.5 1.5 0 0 1 7.5 18V7a1.5 1.5 0 1 1 3 0v11A1.5 1.5 0 0 1 9 19.5ZM16 15.5a1.5 1.5 0 0 1-1.5-1.5V7a1.5 1.5 0 1 1 3 0v7a1.5 1.5 0 0 1-1.5 1.5ZM23 23.5a1.5 1.5 0 0 1-1.5-1.5V7a1.5 1.5 0 1 1 3 0v15a1.5 1.5 0 0 1-1.5 1.5Z" />
    <path d="M28.5 32h-25C1.57 32 0 30.43 0 28.5v-25C0 1.57 1.57 0 3.5 0h25C30.43 0 32 1.57 32 3.5v25c0 1.93-1.57 3.5-3.5 3.5ZM3.5 3a.5.5 0 0 0-.5.5v25a.5.5 0 0 0 .5.5h25a.5.5 0 0 0 .5-.5v-25a.5.5 0 0 0-.5-.5h-25Z" />
  </svg>
);

export default SvgBoard;
