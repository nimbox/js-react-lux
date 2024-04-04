import * as React from "react";
import type { SVGProps } from "react";
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M14 26C7.383 26 2 20.617 2 14S7.383 2 14 2s12 5.383 12 12-5.383 12-12 12m0-21c-4.963 0-9 4.038-9 9s4.037 9 9 9 9-4.038 9-9-4.037-9-9-9" />
    <path d="M28.5 30c-.384 0-.768-.146-1.06-.44l-7-7a1.5 1.5 0 1 1 2.12-2.12l7 7A1.5 1.5 0 0 1 28.5 30" />
  </svg>
);
export default SvgSearch;
