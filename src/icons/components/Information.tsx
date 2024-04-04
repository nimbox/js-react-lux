import * as React from "react";
import type { SVGProps } from "react";
const SvgInformation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16-7.178 16-16 16m0-29C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.831 13-13S23.168 3 16 3" />
    <circle cx={16} cy={10} r={2} />
    <path d="M18.75 25h-4.5a1.5 1.5 0 0 1 0-3h4.5a1.5 1.5 0 0 1 0 3" />
    <path d="M17 25a1.5 1.5 0 0 1-1.5-1.5v-6.214h-1.25a1.5 1.5 0 0 1 0-3H17a1.5 1.5 0 0 1 1.5 1.5V23.5A1.5 1.5 0 0 1 17 25" />
  </svg>
);
export default SvgInformation;
