import * as React from "react";
import type { SVGProps } from "react";
const SvgDescending = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M7.5 26h-4a1.5 1.5 0 0 1 0-3h4a1.5 1.5 0 0 1 0 3ZM12.5 17.5h-9a1.5 1.5 0 0 1 0-3h9a1.5 1.5 0 0 1 0 3ZM17.5 9h-14a1.5 1.5 0 0 1 0-3h14a1.5 1.5 0 0 1 0 3ZM24.5 26a1.5 1.5 0 0 1-1.5-1.5v-17a1.5 1.5 0 0 1 3 0v17a1.5 1.5 0 0 1-1.5 1.5Z" />
    <path d="M24.5 26c-.316 0-.634-.1-.9-.3l-4-3a1.501 1.501 0 0 1 1.8-2.4l3.1 2.325 3.1-2.325a1.501 1.501 0 0 1 1.8 2.4l-4 3c-.266.2-.584.3-.9.3Z" />
  </svg>
);
export default SvgDescending;
