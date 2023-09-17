import * as React from "react";
import type { SVGProps } from "react";
const SvgCircleCrossFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0Zm6.414 19.586a2 2 0 1 1-2.828 2.828L16 18.828l-3.586 3.586c-.39.39-.902.586-1.414.586s-1.023-.195-1.414-.586a2 2 0 0 1 0-2.828L13.172 16l-3.586-3.586a2 2 0 1 1 2.828-2.828L16 13.172l3.586-3.586a2 2 0 1 1 2.828 2.828L18.828 16l3.586 3.586Z" />
  </svg>
);
export default SvgCircleCrossFill;
