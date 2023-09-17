import * as React from "react";
import type { SVGProps } from "react";
const SvgSuccess = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M14 22.5c-.456 0-.887-.207-1.17-.563l-4-5a1.5 1.5 0 1 1 2.34-1.874L14 18.599l6.83-8.536a1.5 1.5 0 1 1 2.34 1.874l-8 10A1.497 1.497 0 0 1 14 22.5Z" />
    <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16-7.178 16-16 16Zm0-29C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3Z" />
  </svg>
);
export default SvgSuccess;
