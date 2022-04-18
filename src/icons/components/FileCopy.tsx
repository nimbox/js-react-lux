import * as React from "react";
import { SVGProps } from "react";

const SvgFilecopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.5 30h-25C1.57 30 0 28.43 0 26.5v-21C0 3.57 1.57 2 3.5 2h8.05c.72 0 1.4.31 1.87.84l2.75 3.12h12.32c1.93 0 3.5 1.57 3.5 3.5V26.5c0 1.93-1.57 3.5-3.5 3.5ZM3.5 5c-.28 0-.5.22-.5.5v21c0 .28.22.5.5.5h25c.28 0 .5-.22.5-.5V9.47c0-.28-.22-.5-.5-.5H15.95c-.71 0-1.4-.31-1.87-.84l-2.76-3.12H3.5Z" />
  </svg>
);

export default SvgFilecopy;
