import * as React from "react";
import type { SVGProps } from "react";
const SvgClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 32C8.005 32 1.5 25.495 1.5 17.5S8.005 3 16 3s14.5 6.505 14.5 14.5S23.995 32 16 32m0-26C9.659 6 4.5 11.159 4.5 17.5S9.659 29 16 29s11.5-5.159 11.5-11.5S22.34 6 16 6" />
    <path d="M19.999 21.5c-.272 0-.547-.073-.794-.228l-4-2.5A1.5 1.5 0 0 1 14.5 17.5V11a1.5 1.5 0 0 1 3 0v5.669l3.295 2.06a1.5 1.5 0 0 1-.796 2.771Z" />
  </svg>
);
export default SvgClock;
