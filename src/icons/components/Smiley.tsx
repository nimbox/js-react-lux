import * as React from "react";
import type { SVGProps } from "react";
const SvgSmiley = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16-7.178 16-16 16m0-29C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.831 13-13S23.168 3 16 3" />
    <circle cx={11} cy={13} r={2} />
    <circle cx={21} cy={13} r={2} />
    <path d="M16 25.5c4.418 0 8-2.686 8-6H8c0 3.314 3.582 6 8 6" />
  </svg>
);
export default SvgSmiley;
