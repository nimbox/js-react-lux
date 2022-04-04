import * as React from "react";
import { SVGProps } from "react";

const SvgDanger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M16 17c-.83 0-1.5-.67-1.5-1.5V10c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5.5c0 .83-.67 1.5-1.5 1.5Z" />
    <circle cx={16} cy={21} r={2} />
    <path d="M22.01 32H9.99c-.4 0-.78-.16-1.06-.44L.44 23.07c-.28-.28-.44-.66-.44-1.06V9.99c0-.4.16-.78.44-1.06L8.93.44C9.21.16 9.59 0 9.99 0H22c.4 0 .78.16 1.06.44l8.49 8.49c.28.28.44.66.44 1.06V22c0 .4-.16.78-.44 1.06l-8.49 8.49c-.28.28-.66.44-1.06.44Zm-11.39-3h10.77l7.62-7.62V10.62L21.39 3H10.62L3 10.62v10.77l7.62 7.62Z" />
  </svg>
);

export default SvgDanger;
