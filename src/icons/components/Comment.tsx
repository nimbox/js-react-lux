import * as React from "react";
import { SVGProps } from "react";

const SvgComment = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M9 30c-.23 0-.46-.05-.67-.16-.51-.25-.83-.77-.83-1.34V24h-2C3.57 24 2 22.43 2 20.5v-15C2 3.57 3.57 2 5.5 2h21C28.43 2 30 3.57 30 5.5v15c0 1.93-1.57 3.5-3.5 3.5h-9l-7.6 5.7c-.26.2-.58.3-.9.3ZM5.5 5c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5H9c.83 0 1.5.67 1.5 1.5v3l5.6-4.2c.26-.19.58-.3.9-.3h9.5c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-21Z" />
  </svg>
);

export default SvgComment;
