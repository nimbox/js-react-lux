import * as React from "react";
import { SVGProps } from "react";

const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.5 32H22c-1.93 0-3.5-1.57-3.5-3.5v-8c0-.27-.23-.5-.5-.5h-4c-.27 0-.5.23-.5.5v8c0 1.93-1.57 3.5-3.5 3.5H3.5C1.57 32 0 30.43 0 28.5v-13c0-1.54.9-3.45 2.08-4.43L13.5 1.62c1.38-1.14 3.57-1.19 5-.11l11.31 8.52c1.25.94 2.19 2.83 2.19 4.4V28.5c0 1.93-1.57 3.5-3.5 3.5ZM14 17h4c1.93 0 3.5 1.57 3.5 3.5v8c0 .27.23.5.5.5h6.5c.27 0 .5-.23.5-.5V14.43c0-.63-.5-1.63-1-2.01L16.69 3.9c-.32-.24-.97-.23-1.28.03L4 13.38c-.5.42-1 1.47-1 2.12v13c0 .27.23.5.5.5H10c.27 0 .5-.23.5-.5v-8c0-1.93 1.57-3.5 3.5-3.5Z" />
  </svg>
);

export default SvgHome;
