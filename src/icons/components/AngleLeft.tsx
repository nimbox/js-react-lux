import * as React from "react";
import { SVGProps } from "react";

const SvgAngleLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M18.5 26c-.4 0-.8-.16-1.09-.47l-8-8.5c-.54-.58-.54-1.48 0-2.06l8-8.5a1.5 1.5 0 0 1 2.18 2.06L12.56 16l7.03 7.47A1.5 1.5 0 0 1 18.5 26Z" />
  </svg>
);

export default SvgAngleLeft;
