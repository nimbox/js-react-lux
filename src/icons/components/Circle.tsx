import * as React from "react";
import { SVGProps } from "react";

const SvgCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 27C9.93 27 5 22.07 5 16S9.93 5 16 5s11 4.93 11 11-4.93 11-11 11Zm0-19c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8Z" />
  </svg>
);

export default SvgCircle;
