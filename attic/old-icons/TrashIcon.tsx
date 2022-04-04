import * as React from "react";
import { SVGProps } from "react";

const SvgTrashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11.8 11.2c.2 4.3.5 8.5.7 12.8M16 11.2V24M20.1 11.2 19.4 24" />
    <path d="m8.4 8.7 1.4 16.4c0 .5.5.9.9.9h10.6c.5 0 .9-.4.9-.9l1.4-16.4H8.4zM7.2 6.6c.2-.3.5-.6.9-.6h15.7c.4 0 .8.3.9.6l.7 2.1H6.5l.7-2.1zM13.5 6V4.1c0-.5.4-.9.9-.9h3.2c.5 0 .9.4.9.9V6h-5z" />
  </svg>
);

export default SvgTrashIcon;
