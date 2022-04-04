import * as React from "react";
import { SVGProps } from "react";

const SvgCirclePlusFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0Zm6.67 18h-4.5v4.5c0 1.1-.9 2-2 2s-2-.9-2-2V18h-4.5c-1.1 0-2-.9-2-2s.9-2 2-2h4.5V9.5c0-1.1.9-2 2-2s2 .9 2 2V14h4.5c1.1 0 2 .9 2 2s-.9 2-2 2Z" />
  </svg>
);

export default SvgCirclePlusFill;
