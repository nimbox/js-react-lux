import * as React from "react";
import type { SVGProps } from "react";
const SvgInbox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.5 30h-25C1.57 30 0 28.43 0 26.5V18c0-.212.045-.42.131-.613l5.97-13.318A3.5 3.5 0 0 1 9.296 2h13.41c1.377 0 2.63.812 3.193 2.069l5.97 13.318c.087.192.132.401.132.613v8.5c0 1.93-1.57 3.5-3.5 3.5M3 18.321V26.5a.5.5 0 0 0 .5.5h25a.5.5 0 0 0 .5-.5v-8.179L23.161 5.296A.5.5 0 0 0 22.705 5H9.295a.5.5 0 0 0-.456.295zM7.47 4.682h.01z" />
    <path d="M19 23h-6a1.5 1.5 0 0 1-.988-.371L8.436 19.5H1.5a1.5 1.5 0 0 1 0-3H9a1.5 1.5 0 0 1 .988.371L13.564 20h4.873l3.575-3.129A1.5 1.5 0 0 1 23 16.5h7.5a1.5 1.5 0 0 1 0 3h-6.936l-3.576 3.129A1.5 1.5 0 0 1 19 23" />
  </svg>
);
export default SvgInbox;
