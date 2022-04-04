import * as React from "react";
import { SVGProps } from "react";

const SvgTag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M17.88 31.93c-.21.04-.56.04-.77 0s-1.31-1-2.09-1.78L3.85 18.97c-.78-.78-1.51-1.56-1.63-1.75S2 15.59 2 14.49V5.5c0-1.1.15-2.34.34-2.75S4.4 2 5.5 2h9c1.1 0 2.18.04 2.39.08s1.31 1 2.09 1.77l11.17 11.17c.78.78 1.55 1.76 1.71 2.18s-.93 1.99-1.71 2.77L19.98 30.14c-.78.78-1.88 1.74-2.09 1.78ZM5 13.88c0 1.1.64 2.64 1.41 3.41l9.67 9.67c.78.78 2.05.78 2.83 0l8.05-8.05c.78-.78.78-2.05 0-2.83l-9.67-9.67C16.51 5.63 14.98 5 13.88 5H7c-1.1 0-2 .9-2 2v6.88Z" />
    <circle cx={12} cy={12} r={2.5} />
  </svg>
);

export default SvgTag;
