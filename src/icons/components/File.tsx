import * as React from "react";
import { SVGProps } from "react";

const SvgFile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M24.5 32h-17C5.57 32 4 30.43 4 28.5v-25C4 1.57 5.57 0 7.5 0h11c.4 0 .78.16 1.06.44l8 8c.28.28.44.66.44 1.06v19c0 1.93-1.57 3.5-3.5 3.5ZM7.5 3c-.28 0-.5.22-.5.5v25c0 .28.22.5.5.5h17c.28 0 .5-.22.5-.5V10.12L17.88 3H7.5Z" />
    <path d="M26.5 12h-7c-1.93 0-3.5-1.57-3.5-3.5v-7c0-.83.67-1.5 1.5-1.5S19 .67 19 1.5v7c0 .28.22.5.5.5h7c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5Z" />
  </svg>
);

export default SvgFile;
