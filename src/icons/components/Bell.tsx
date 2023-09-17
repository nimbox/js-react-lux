import * as React from "react";
import type { SVGProps } from "react";
const SvgBell = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M29 26H3a1.499 1.499 0 0 1-1.238-2.347L6.5 16.727V9.5a9.536 9.536 0 0 1 3.004-6.932A9.43 9.43 0 0 1 16.629.02C21.603.342 25.5 4.627 25.5 9.774v6.954l4.738 6.925A1.5 1.5 0 0 1 29 26ZM5.844 23h20.312l-3.22-4.706a2.487 2.487 0 0 1-.436-1.411V9.774c0-3.57-2.664-6.54-6.064-6.76a6.446 6.446 0 0 0-4.88 1.743A6.438 6.438 0 0 0 9.5 9.5v7.383c0 .507-.151.995-.438 1.412L5.844 23Zm19.566-6.403.002.002-.002-.002ZM16 28.005 20 28v.005C20 30.197 18.194 32 16 32s-4-1.803-4-3.995v-.003l4 .003Z" />
  </svg>
);
export default SvgBell;
