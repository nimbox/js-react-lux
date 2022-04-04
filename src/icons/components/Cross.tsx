import * as React from "react";
import { SVGProps } from "react";

const SvgCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M23.5 25c-.38 0-.77-.15-1.06-.44l-15-15c-.59-.59-.59-1.54 0-2.12s1.54-.59 2.12 0l15 15c.59.59.59 1.54 0 2.12-.29.29-.68.44-1.06.44Z" />
    <path d="M8.5 25c-.38 0-.77-.15-1.06-.44a1.49 1.49 0 0 1 0-2.12l15-15c.59-.59 1.54-.59 2.12 0s.59 1.54 0 2.12l-15 15c-.29.29-.68.44-1.06.44Z" />
  </svg>
);

export default SvgCross;
