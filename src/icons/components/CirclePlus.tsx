import type { SVGProps } from "react";
const SvgCirclePlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16-7.178 16-16 16m0-29C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3" />
    <path d="M22.5 17.5h-13a1.5 1.5 0 0 1 0-3h13a1.5 1.5 0 0 1 0 3" />
    <path d="M16 24a1.5 1.5 0 0 1-1.5-1.5v-13a1.5 1.5 0 0 1 3 0v13A1.5 1.5 0 0 1 16 24" />
  </svg>
);
export default SvgCirclePlus;
