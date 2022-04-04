import * as React from "react";
import { SVGProps } from "react";

const SvgGlobe = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M16 32C7.18 32 0 24.82 0 16S7.18 0 16 0s16 7.18 16 16-7.18 16-16 16Zm0-29C8.83 3 3 8.83 3 16s5.83 13 13 13 13-5.83 13-13S23.17 3 16 3Z" />
    <path d="M16 32c-.42 0-.82-.17-1.1-.48-.26-.28-6.4-7.02-6.4-15.52S14.64.76 14.9.48c.57-.61 1.63-.61 2.2 0 .26.28 6.4 7.02 6.4 15.52s-6.14 15.24-6.4 15.52c-.28.31-.68.48-1.1.48Zm0-28.11C14.37 6.1 11.5 10.74 11.5 16s2.87 9.89 4.5 12.11c1.63-2.21 4.5-6.85 4.5-12.11S17.63 6.11 16 3.89Z" />
    <path d="M1.5 14.5h29v3h-29z" />
  </svg>
);

export default SvgGlobe;
