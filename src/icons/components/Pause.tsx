import * as React from "react";
import type { SVGProps } from "react";
const SvgPause = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <rect width={8} height={22} x={6} y={5} rx={1} ry={1} />
    <rect width={8} height={22} x={18} y={5} rx={1} ry={1} />
  </svg>
);
export default SvgPause;
