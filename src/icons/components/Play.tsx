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
    <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16-7.178 16-16 16Zm0-29C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3Z" />
    <path d="M20.628 16.49c.48-.27.48-.71 0-.98l-6.256-3.52c-.48-.27-.872-.04-.872.51v7c0 .55.392.78.872.51l6.256-3.52Z" />
  </svg>
);

export default SvgPlay;
