import * as React from "react";
import { SVGProps } from "react";

const SvgSortable = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M22.5 26c-.83 0-1.5-.67-1.5-1.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5Z" />
    <path d="M22.5 26c-.32 0-.63-.1-.9-.3l-4-3a1.5 1.5 0 0 1-.3-2.1c.5-.66 1.44-.79 2.1-.3l3.1 2.33 3.1-2.33a1.5 1.5 0 1 1 1.8 2.4l-4 3c-.27.2-.58.3-.9.3ZM9.5 26c-.83 0-1.5-.67-1.5-1.5v-17C8 6.67 8.67 6 9.5 6s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5Z" />
    <path d="M13.5 12c-.31 0-.63-.1-.9-.3L9.5 9.37 6.4 11.7a1.5 1.5 0 0 1-1.8-2.4l4-3a1.5 1.5 0 0 1 1.8 0l4 3a1.5 1.5 0 0 1-.9 2.7Z" />
  </svg>
);

export default SvgSortable;
