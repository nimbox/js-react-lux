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
    <path d="M30.5 32h-29c-.52 0-1-.27-1.28-.71-.27-.44-.3-.99-.07-1.46l14.51-29C14.91.32 15.43 0 16 0s1.09.32 1.34.83l14.5 29c.23.46.21 1.02-.07 1.46-.27.44-.76.71-1.28.71ZM3.93 29h24.14L16 4.85 3.93 29Z" />
    <path d="M16 20c-.83 0-1.5-.67-1.5-1.5V14c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v4.5c0 .83-.67 1.5-1.5 1.5Z" />
    <circle cx={16} cy={24} r={2} />
  </svg>
);

export default SvgWarning;
