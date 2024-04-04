import * as React from "react";
import type { SVGProps } from "react";
const SvgLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M24.5 30h-17C5.57 30 4 28.43 4 26.5v-11C4 13.57 5.57 12 7.5 12h17c1.93 0 3.5 1.57 3.5 3.5v11c0 1.93-1.57 3.5-3.5 3.5m-17-15c-.275 0-.5.225-.5.5v11c0 .275.225.5.5.5h17c.275 0 .5-.225.5-.5v-11c0-.275-.225-.5-.5-.5z" />
    <path d="M22.5 15a1.5 1.5 0 0 1-1.5-1.5V9.773a2 2 0 0 1-.021-.159C20.78 7.026 18.595 5 16 5s-4.781 2.026-4.978 4.614a2 2 0 0 1-.022.161V13.5a1.5 1.5 0 0 1-3 0v-4q0-.218.059-.417C8.518 5.087 11.949 2 16 2c4.056 0 7.49 3.093 7.942 7.095Q24 9.288 24 9.5v4a1.5 1.5 0 0 1-1.5 1.5" />
  </svg>
);
export default SvgLock;
