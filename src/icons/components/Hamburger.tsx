import * as React from "react";
import type { SVGProps } from "react";
const SvgHamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.5 17.5h-25a1.5 1.5 0 0 1 0-3h25a1.5 1.5 0 0 1 0 3M28.5 28h-25a1.5 1.5 0 0 1 0-3h25a1.5 1.5 0 0 1 0 3M28.5 7h-25a1.5 1.5 0 0 1 0-3h25a1.5 1.5 0 0 1 0 3" />
  </svg>
);
export default SvgHamburger;
