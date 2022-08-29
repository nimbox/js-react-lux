import * as React from "react";
import { SVGProps } from "react";

const SvgMapSelector = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <circle cx={16} cy={12.5} r={4} />
    <path d="M16 24C9.66 24 4.5 18.84 4.5 12.5S9.66 1 16 1s11.5 5.159 11.5 11.5S22.34 24 16 24Zm0-20c-4.686 0-8.5 3.813-8.5 8.5S11.313 21 16 21s8.5-3.813 8.5-8.5S20.687 4 16 4Z" />
    <path d="M16 31a1.5 1.5 0 0 1-1.5-1.5v-7a1.5 1.5 0 0 1 3 0v7A1.5 1.5 0 0 1 16 31Z" />
  </svg>
);

export default SvgMapSelector;
