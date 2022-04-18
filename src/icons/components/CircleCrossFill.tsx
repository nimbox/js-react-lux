import * as React from "react";
import { SVGProps } from "react";

const SvgCircleCrossFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0Zm6.41 19.59A2.004 2.004 0 0 1 21 23.01c-.51 0-1.02-.2-1.41-.59L16 18.83l-3.59 3.59c-.39.39-.9.59-1.41.59s-1.02-.2-1.41-.59c-.78-.78-.78-2.05 0-2.83L13.18 16l-3.59-3.59c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0l3.59 3.59 3.59-3.59c.78-.78 2.05-.78 2.83 0s.78 2.05 0 2.83L18.84 16l3.59 3.59Z" />
  </svg>
);

export default SvgCircleCrossFill;
