import * as React from "react";
import { SVGProps } from "react";

const SvgHamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.5 17.5h-25c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5ZM28.5 28h-25c-.83 0-1.5-.67-1.5-1.5S2.67 25 3.5 25h25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5ZM28.5 7h-25C2.67 7 2 6.33 2 5.5S2.67 4 3.5 4h25c.83 0 1.5.67 1.5 1.5S29.33 7 28.5 7Z" />
  </svg>
);

export default SvgHamburger;
