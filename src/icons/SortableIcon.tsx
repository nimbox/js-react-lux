import * as React from "react";
import { SVGProps } from "react";

const SvgSortableIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M15 5h2M10.5 9h11M6 13h20M26 19H6M21.5 23h-11M17 27h-2" />
  </svg>
);

export default SvgSortableIcon;
