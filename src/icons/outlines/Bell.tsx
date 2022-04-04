import * as React from "react";
import { SVGProps } from "react";

const SvgBell = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M29 26H3c-.56 0-1.07-.31-1.33-.8-.26-.49-.23-1.09.09-1.55l4.74-6.93V9.49c0-2.62 1.09-5.14 3-6.93C11.44.75 13.97-.15 16.63.02c4.97.32 8.87 4.61 8.87 9.75v6.95l4.74 6.93c.31.46.35 1.05.09 1.55-.26.49-.77.8-1.33.8ZM5.84 23h20.32l-3.22-4.71c-.28-.41-.44-.9-.44-1.41V9.77c0-3.57-2.66-6.54-6.06-6.76-1.82-.12-3.56.5-4.88 1.74A6.425 6.425 0 0 0 9.5 9.49v7.38c0 .51-.15 1-.44 1.41l-3.22 4.71Zm19.57-6.4ZM16 28h4c0 2.19-1.81 4-4 4s-4-1.8-4-4h4Z" />
  </svg>
);

export default SvgBell;
