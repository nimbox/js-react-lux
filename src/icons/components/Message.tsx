import * as React from "react";
import { SVGProps } from "react";

const SvgMessage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M28.5 28h-25C1.57 28 0 26.43 0 24.5v-17C0 5.57 1.57 4 3.5 4h25C30.43 4 32 5.57 32 7.5v17c0 1.93-1.57 3.5-3.5 3.5ZM3.5 7c-.28 0-.5.22-.5.5v17c0 .28.22.5.5.5h25c.28 0 .5-.22.5-.5v-17c0-.28-.22-.5-.5-.5h-25Z" />
    <path d="M16 18c-.24 0-.47-.06-.69-.17l-14.5-7.5C.07 9.95-.21 9.04.17 8.31s1.29-1.03 2.02-.64L16 14.81l13.81-7.14c.74-.38 1.64-.09 2.02.64.38.74.09 1.64-.64 2.02l-14.5 7.5c-.22.11-.45.17-.69.17Z" />
  </svg>
);

export default SvgMessage;
