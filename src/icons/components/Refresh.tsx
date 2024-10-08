import * as React from "react";
import type { SVGProps } from "react";
const SvgRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M20.707 20.707C20.318 20.318 20.45 20 21 20h6c.55 0 1 .45 1 1v6c0 .55-.318.682-.707.293zM11.293 11.293c.389.389.257.707-.293.707H5c-.55 0-1-.45-1-1V5c0-.55.318-.682.707-.293z" />
    <path d="M27.322 15.498a1.5 1.5 0 0 1-1.475-1.24A9.984 9.984 0 0 0 16 6a10.07 10.07 0 0 0-7.074 2.932 1.502 1.502 0 0 1-2.123-2.121A13.1 13.1 0 0 1 16 3a12.98 12.98 0 0 1 12.802 10.737 1.5 1.5 0 0 1-1.48 1.761M16 29A12.98 12.98 0 0 1 3.197 18.255a1.5 1.5 0 1 1 2.955-.52A9.98 9.98 0 0 0 16 26c2.631 0 5.208-1.067 7.07-2.928a1.501 1.501 0 0 1 2.121 2.123A13.1 13.1 0 0 1 16 29" />
  </svg>
);
export default SvgRefresh;
