import * as React from "react";
import { SVGProps } from "react";

const SvgCirclePlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M16 32C7.18 32 0 24.82 0 16S7.18 0 16 0s16 7.18 16 16-7.18 16-16 16Zm0-29C8.83 3 3 8.83 3 16s5.83 13 13 13 13-5.83 13-13S23.17 3 16 3Z" />
    <path d="M22.5 17.5h-13c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5Z" />
    <path d="M16 24c-.83 0-1.5-.67-1.5-1.5v-13c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v13c0 .83-.67 1.5-1.5 1.5Z" />
  </svg>
);

export default SvgCirclePlus;
