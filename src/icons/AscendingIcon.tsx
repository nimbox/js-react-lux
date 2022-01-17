import * as React from "react";
import { SVGProps } from "react";

const SvgAscendingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M13.5 6h5M11 12.6h10M8.5 19.2h15M6 26h20" />
  </svg>
);

export default SvgAscendingIcon;
