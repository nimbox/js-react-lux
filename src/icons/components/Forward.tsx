import * as React from "react";
import { SVGProps } from "react";

const SvgForward = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M19.84 9.34c0-.55.32-.68.71-.29l4.24 4.24c.39.39.39 1.03 0 1.41l-4.24 4.24c-.39.39-.71.26-.71-.29V9.34Z" />
    <path d="M6.5 25.08a1.492 1.492 0 0 1-1.32-2.19c.22-.42 5.53-10.38 15.33-10.38.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5c-7.96 0-12.62 8.69-12.67 8.77-.27.51-.79.8-1.33.8Z" />
  </svg>
);

export default SvgForward;
