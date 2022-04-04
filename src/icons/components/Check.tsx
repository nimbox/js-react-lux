import * as React from "react";
import { SVGProps } from "react";

const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M12 25.5h-.06a1.51 1.51 0 0 1-1.14-.6l-6-8a1.5 1.5 0 0 1 2.4-1.8l4.89 6.52L24.87 7.01a1.502 1.502 0 1 1 2.26 1.98l-14 16c-.29.33-.7.51-1.13.51Z" />
  </svg>
);

export default SvgCheck;
