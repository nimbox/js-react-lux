import * as React from "react";
import { SVGProps } from "react";

const SvgMapMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <circle cx={16} cy={14.5} r={4} />
    <path d="M16 31c-.36 0-.72-.13-1.01-.39l-7.75-7a.752.752 0 0 1-.15-.16C4.49 21 3 17.56 3 14 3 6.83 8.83 1 16 1s13 5.83 13 13c0 3.56-1.49 7-4.09 9.45-.05.06-.1.11-.15.16l-7.75 7c-.29.26-.65.39-1.01.39Zm-6.59-9.48L16 27.48l6.6-5.96s.09-.1.13-.14C24.81 19.48 26 16.79 26 14c0-5.51-4.49-10-10-10S6 8.49 6 14c0 2.79 1.19 5.48 3.27 7.38.05.04.09.09.14.14Z" />
  </svg>
);

export default SvgMapMarker;
