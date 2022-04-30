import * as React from "react";
import { SVGProps } from "react";

const SvgDescending = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M7.5 26h-4c-.83 0-1.5-.67-1.5-1.5S2.67 23 3.5 23h4c.83 0 1.5.67 1.5 1.5S8.33 26 7.5 26ZM12.5 17.5h-9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5ZM17.5 9h-14C2.67 9 2 8.33 2 7.5S2.67 6 3.5 6h14c.83 0 1.5.67 1.5 1.5S18.33 9 17.5 9ZM24.5 26c-.83 0-1.5-.67-1.5-1.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5Z" />
    <path d="M24.5 26c-.32 0-.63-.1-.9-.3l-4-3a1.5 1.5 0 0 1-.3-2.1c.5-.66 1.44-.79 2.1-.3l3.1 2.33 3.1-2.33a1.5 1.5 0 0 1 1.8 2.4l-4 3c-.27.2-.58.3-.9.3Z" />
  </svg>
);

export default SvgDescending;
