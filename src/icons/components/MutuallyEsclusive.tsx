import type { SVGProps } from "react";
const SvgMutuallyEsclusive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M10.5 26.5C4.71 26.5 0 21.79 0 16S4.71 5.5 10.5 5.5 21 10.21 21 16s-4.71 10.5-10.5 10.5m0-18C6.364 8.5 3 11.864 3 16s3.364 7.5 7.5 7.5S18 20.136 18 16s-3.364-7.5-7.5-7.5" />
    <path d="M21.5 26.5C15.71 26.5 11 21.79 11 16S15.71 5.5 21.5 5.5 32 10.21 32 16s-4.71 10.5-10.5 10.5m0-18c-4.136 0-7.5 3.364-7.5 7.5s3.364 7.5 7.5 7.5S29 20.136 29 16s-3.364-7.5-7.5-7.5" />
  </svg>
);
export default SvgMutuallyEsclusive;
