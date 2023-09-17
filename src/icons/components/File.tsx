import * as React from "react";
import type { SVGProps } from "react";
const SvgFile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M24.5 32h-17C5.57 32 4 30.43 4 28.5v-25C4 1.57 5.57 0 7.5 0h11a1.5 1.5 0 0 1 1.06.44l8 8A1.5 1.5 0 0 1 28 9.5v19c0 1.93-1.57 3.5-3.5 3.5ZM7.5 3a.5.5 0 0 0-.5.5v25a.5.5 0 0 0 .5.5h17a.5.5 0 0 0 .5-.5V10.121L17.879 3H7.5Z" />
    <path d="M26.5 12h-7c-1.93 0-3.5-1.57-3.5-3.5v-7a1.5 1.5 0 0 1 3 0v7a.5.5 0 0 0 .5.5h7a1.5 1.5 0 0 1 0 3Z" />
  </svg>
);
export default SvgFile;
