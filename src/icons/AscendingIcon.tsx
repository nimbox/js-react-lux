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
    <path d="M15 9h2M12 13.6h8M9 18.2h14M6 23h20" />
  </svg>
);

export default SvgAscendingIcon;
