import * as React from "react";
import { SVGProps } from "react";

const SvgLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M24.5 30h-17C5.57 30 4 28.43 4 26.5v-11C4 13.57 5.57 12 7.5 12h17c1.93 0 3.5 1.57 3.5 3.5v11c0 1.93-1.57 3.5-3.5 3.5Zm-17-15c-.28 0-.5.22-.5.5v11c0 .28.22.5.5.5h17c.28 0 .5-.22.5-.5v-11c0-.28-.22-.5-.5-.5h-17Z" />
    <path d="M22.5 15c-.83 0-1.5-.67-1.5-1.5V9.77c0-.05-.02-.11-.02-.16C20.78 7.02 18.6 5 16 5s-4.78 2.03-4.98 4.61c0 .05-.01.11-.02.16v3.72c0 .83-.67 1.5-1.5 1.5S8 14.32 8 13.49v-4c0-.14.02-.28.06-.42.46-4 3.89-7.08 7.94-7.08s7.49 3.09 7.94 7.09c.04.13.06.26.06.41v4c0 .83-.67 1.5-1.5 1.5Z" />
  </svg>
);

export default SvgLock;
