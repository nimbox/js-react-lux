import * as React from "react";
import { SVGProps } from "react";

const SvgAngleUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M24.5 20c-.37 0-.74-.13-1.03-.41L16 12.56l-7.47 7.03a1.5 1.5 0 0 1-2.06-2.18l8.5-8c.58-.54 1.48-.54 2.06 0l8.5 8A1.5 1.5 0 0 1 24.5 20Z" />
  </svg>
);

export default SvgAngleUp;
