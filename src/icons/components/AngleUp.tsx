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
    <path d="M24.5 20c-.37 0-.738-.135-1.028-.407L16 12.56l-7.472 7.033a1.501 1.501 0 0 1-2.056-2.186l8.5-8a1.502 1.502 0 0 1 2.056 0l8.5 8A1.502 1.502 0 0 1 24.5 20Z" />
  </svg>
);

export default SvgAngleUp;
