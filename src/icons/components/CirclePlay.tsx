import type { SVGProps } from "react";
const SvgCirclePlay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16-7.178 16-16 16m0-29C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.831 13-13S23.168 3 16 3" />
    <path d="M20.652 16.53c.466-.291.466-.768 0-1.06l-6.304-3.94c-.466-.291-.848-.08-.848.47v8c0 .55.382.762.848.47z" />
  </svg>
);
export default SvgCirclePlay;
