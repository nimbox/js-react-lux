import * as React from "react";
import { SVGProps } from "react";

const SvgAnniversary = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M26.5 32h-21C3.57 32 2 30.43 2 28.5v-21C2 5.57 3.57 4 5.5 4h21C28.43 4 30 5.57 30 7.5v21c0 1.93-1.57 3.5-3.5 3.5ZM5.5 7c-.28 0-.5.22-.5.5v21c0 .28.22.5.5.5h21c.28 0 .5-.22.5-.5v-21c0-.28-.22-.5-.5-.5h-21Z" />
    <path d="M9 7c-.83 0-1.5-.67-1.5-1.5v-4C7.5.67 8.17 0 9 0s1.5.67 1.5 1.5v4C10.5 6.33 9.83 7 9 7ZM23 7c-.83 0-1.5-.67-1.5-1.5v-4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5ZM28.5 15h-25c-.83 0-1.5-.67-1.5-1.5S2.67 12 3.5 12h25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5Z" />
    <circle cx={23} cy={19} r={2} />
  </svg>
);

export default SvgAnniversary;
