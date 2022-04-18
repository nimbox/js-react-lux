import * as React from "react";
import { SVGProps } from "react";

const SvgInbox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.5 30h-25C1.57 30 0 28.43 0 26.5V18c0-.21.04-.42.13-.61L6.1 4.07A3.499 3.499 0 0 1 9.29 2H22.7c1.38 0 2.63.81 3.19 2.07l5.97 13.32c.09.19.13.4.13.61v8.5c0 1.93-1.57 3.5-3.5 3.5ZM3 18.32v8.18c0 .28.22.5.5.5h25c.28 0 .5-.22.5-.5v-8.18L23.16 5.29a.505.505 0 0 0-.46-.3H9.3c-.2 0-.38.12-.46.3L3 18.32ZM7.47 4.68Z" />
    <path d="M19 23h-6c-.36 0-.71-.13-.99-.37L8.43 19.5H1.5C.67 19.5 0 18.83 0 18s.67-1.5 1.5-1.5H9c.36 0 .71.13.99.37L13.57 20h4.87l3.58-3.13c.27-.24.62-.37.99-.37h7.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-6.94l-3.58 3.13c-.27.24-.62.37-.99.37Z" />
  </svg>
);

export default SvgInbox;
