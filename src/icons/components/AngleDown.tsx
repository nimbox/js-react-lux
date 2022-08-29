import * as React from "react";
import { SVGProps } from "react";

const SvgAngleDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 23c-.37 0-.74-.136-1.028-.407l-8.5-8a1.502 1.502 0 0 1-.065-2.121 1.502 1.502 0 0 1 2.121-.065L16 19.44l7.472-7.033a1.502 1.502 0 0 1 2.12.065 1.502 1.502 0 0 1-.064 2.12l-8.5 8C16.74 22.865 16.37 23 16 23Z" />
  </svg>
);

export default SvgAngleDown;
