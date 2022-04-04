import * as React from "react";
import { SVGProps } from "react";

const SvgFullSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M28.5 32h-25C1.57 32 0 30.43 0 28.5v-25C0 1.57 1.57 0 3.5 0h25C30.43 0 32 1.57 32 3.5v25c0 1.93-1.57 3.5-3.5 3.5ZM3.5 3c-.28 0-.5.22-.5.5v25c0 .28.22.5.5.5h25c.28 0 .5-.22.5-.5v-25c0-.28-.22-.5-.5-.5h-25Z" />
  </svg>
);

export default SvgFullSquare;