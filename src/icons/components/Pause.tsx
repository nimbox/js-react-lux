import * as React from "react";
import type { SVGProps } from "react";
const SvgPause = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16-7.178 16-16 16m0-29C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.831 13-13S23.168 3 16 3" />
    <path d="M13 21.5a1.5 1.5 0 0 1-1.5-1.5v-8a1.5 1.5 0 0 1 3 0v8a1.5 1.5 0 0 1-1.5 1.5M19 21.5a1.5 1.5 0 0 1-1.5-1.5v-8a1.5 1.5 0 0 1 3 0v8a1.5 1.5 0 0 1-1.5 1.5" />
  </svg>
);
export default SvgPause;
