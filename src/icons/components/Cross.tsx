import * as React from "react";
import type { SVGProps } from "react";
const SvgCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M23.5 25c-.384 0-.768-.146-1.06-.44l-15-15a1.5 1.5 0 1 1 2.12-2.12l15 15A1.5 1.5 0 0 1 23.5 25" />
    <path d="M8.5 25a1.5 1.5 0 0 1-1.06-2.56l15-15a1.5 1.5 0 1 1 2.12 2.12l-15 15c-.292.293-.676.44-1.06.44Z" />
  </svg>
);
export default SvgCross;
