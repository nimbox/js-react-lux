import * as React from "react";
import { SVGProps } from "react";

const SvgPlay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 32C7.18 32 0 24.82 0 16S7.18 0 16 0s16 7.18 16 16-7.18 16-16 16Zm0-29C8.83 3 3 8.83 3 16s5.83 13 13 13 13-5.83 13-13S23.17 3 16 3Z" />
    <path d="M20.63 16.49c.48-.27.48-.71 0-.98l-6.26-3.52c-.48-.27-.87-.04-.87.51v7c0 .55.39.78.87.51l6.26-3.52Z" />
  </svg>
);

export default SvgPlay;
