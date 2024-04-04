import * as React from "react";
import type { SVGProps } from "react";
const SvgPerson = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m0-13c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5" />
    <path d="M26.5 28.5A1.5 1.5 0 0 1 25 27c0-4.962-4.037-9-9-9s-9 4.038-9 9a1.5 1.5 0 0 1-3 0c0-6.617 5.383-12 12-12s12 5.383 12 12a1.5 1.5 0 0 1-1.5 1.5" />
  </svg>
);
export default SvgPerson;
