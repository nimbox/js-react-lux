import * as React from "react";
import { SVGProps } from "react";

const SvgAngleDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 23c-.37 0-.74-.14-1.03-.41l-8.5-8a1.5 1.5 0 0 1 2.06-2.18L16 19.44l7.47-7.03a1.5 1.5 0 0 1 2.06 2.18l-8.5 8c-.29.27-.66.41-1.03.41Z" />
  </svg>
);

export default SvgAngleDown;
