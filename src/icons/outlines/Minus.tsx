import * as React from "react";
import { SVGProps } from "react";

const SvgMinus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M26 17.5H6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h20c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5Z" />
  </svg>
);

export default SvgMinus;
