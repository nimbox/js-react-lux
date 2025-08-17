import type { SVGProps } from "react";
const SvgMinus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M26 17.5H6a1.5 1.5 0 0 1 0-3h20a1.5 1.5 0 0 1 0 3" />
  </svg>
);
export default SvgMinus;
