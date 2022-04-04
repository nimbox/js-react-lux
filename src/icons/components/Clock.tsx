import * as React from "react";
import { SVGProps } from "react";

const SvgClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M16 32C8 32 1.5 25.5 1.5 17.5S8 3 16 3s14.5 6.5 14.5 14.5S24 32 16 32Zm0-26C9.66 6 4.5 11.16 4.5 17.5S9.66 29 16 29s11.5-5.16 11.5-11.5S22.34 6 16 6Z" />
    <path d="M20 21.5c-.27 0-.55-.07-.79-.23l-4-2.5a1.49 1.49 0 0 1-.71-1.27V11c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5.67l3.29 2.06a1.504 1.504 0 0 1-.79 2.78Z" />
  </svg>
);

export default SvgClock;
