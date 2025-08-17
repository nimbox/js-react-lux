import type { SVGProps } from "react";
const SvgHorizontalDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <circle cx={8} cy={16} r={2} />
    <circle cx={16} cy={16} r={2} />
    <circle cx={24} cy={16} r={2} />
  </svg>
);
export default SvgHorizontalDots;
