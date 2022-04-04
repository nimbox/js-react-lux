import * as React from "react";
import { SVGProps } from "react";

const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M29.5 32h-27c-.79 0-1.47-.35-1.85-.97s-.4-1.38-.04-2.09l13.6-27.22C14.59.97 15.25.52 16 .52s1.41.45 1.79 1.2L31.4 28.93c.35.71.34 1.47-.04 2.09s-1.06.97-1.85.97ZM3.93 29h24.14L16 4.85 3.93 29Z" />
    <path d="M16 20c-.83 0-1.5-.67-1.5-1.5V14c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v4.5c0 .83-.67 1.5-1.5 1.5Z" />
    <circle cx={16} cy={24} r={2} />
  </svg>
);

export default SvgWarning;
