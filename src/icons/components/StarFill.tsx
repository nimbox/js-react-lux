import * as React from "react";
import { SVGProps } from "react";

const SvgStarFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M24.52 30.62c-.23 0-.46-.05-.67-.16l-7.86-3.9-7.86 3.9c-.5.25-1.1.2-1.55-.13-.45-.33-.68-.88-.6-1.43l1.28-8.68-6.12-6.27c-.39-.4-.53-.98-.36-1.51.17-.53.63-.92 1.18-1.01l8.65-1.46 4.06-7.78a1.505 1.505 0 0 1 2.66 0l4.06 7.77 8.65 1.46c.55.09 1 .48 1.18 1.01.17.53.04 1.11-.36 1.51l-6.14 6.27L26 28.89a1.505 1.505 0 0 1-1.48 1.72Z" />
  </svg>
);

export default SvgStarFill;
