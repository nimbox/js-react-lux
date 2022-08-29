import * as React from "react";
import { SVGProps } from "react";

const SvgMessage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.5 28h-25C1.57 28 0 26.43 0 24.5v-17C0 5.57 1.57 4 3.5 4h25C30.43 4 32 5.57 32 7.5v17c0 1.93-1.57 3.5-3.5 3.5ZM3.5 7a.5.5 0 0 0-.5.5v17a.5.5 0 0 0 .5.5h25a.5.5 0 0 0 .5-.5v-17a.5.5 0 0 0-.5-.5h-25Z" />
    <path d="M16 18c-.236 0-.473-.056-.689-.168l-14.5-7.5a1.5 1.5 0 1 1 1.378-2.664l13.81 7.144 13.812-7.144a1.5 1.5 0 1 1 1.378 2.664l-14.5 7.5a1.492 1.492 0 0 1-.69.168Z" />
  </svg>
);

export default SvgMessage;
