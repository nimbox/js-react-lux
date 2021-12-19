import * as React from "react";
import { SVGProps } from "react";

const SvgPhoneIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M9.9 8.2c.1 1 .2 2 .5 2.9l-1.3 1.3c-.5-1.3-.7-2.7-.8-4.2h1.6zm11 13.4c.9.3 1.9.4 2.9.5v1.7c-1.5-.1-2.9-.4-4.2-.8l1.3-1.4zM11 6H7.1C6.5 6 6 6.5 6 7.1 6 17.5 14.5 26 24.9 26c.6 0 1.1-.5 1.1-1.1V21c0-.6-.5-1.1-1.1-1.1-1.4 0-2.7-.2-4-.6-.1 0-.2-.1-.3-.1-.3 0-.6.1-.8.3L17.3 22c-3.1-1.6-5.7-4.2-7.3-7.3l2.4-2.4c.3-.3.4-.7.3-1.1-.4-1.2-.6-2.6-.6-4 0-.7-.5-1.2-1.1-1.2z" />
  </svg>
);

export default SvgPhoneIcon;
