import * as React from "react";
import { SVGProps } from "react";

const SvgMutuallyEsclusive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M10.5 26.5C4.71 26.5 0 21.79 0 16S4.71 5.5 10.5 5.5 21 10.21 21 16s-4.71 10.5-10.5 10.5Zm0-18C6.36 8.5 3 11.86 3 16s3.36 7.5 7.5 7.5S18 20.14 18 16s-3.36-7.5-7.5-7.5Z" />
    <path d="M21.5 26.5C15.71 26.5 11 21.79 11 16S15.71 5.5 21.5 5.5 32 10.21 32 16s-4.71 10.5-10.5 10.5Zm0-18c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5S29 20.14 29 16s-3.36-7.5-7.5-7.5Z" />
  </svg>
);

export default SvgMutuallyEsclusive;
