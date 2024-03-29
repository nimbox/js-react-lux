import * as React from "react";
import { SVGProps } from "react";

const SvgSuccessIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path className="success-icon_svg__st0" d="M25 9 13.3 23 7 15.3" />
    <circle className="success-icon_svg__st0" cx={16} cy={16} r={15} />
  </svg>
);

export default SvgSuccessIcon;
