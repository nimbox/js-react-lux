import * as React from "react";
import { SVGProps } from "react";

const SvgCircleCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 32C7.18 32 0 24.82 0 16S7.18 0 16 0s16 7.18 16 16-7.18 16-16 16Zm0-29C8.83 3 3 8.83 3 16s5.83 13 13 13 13-5.83 13-13S23.17 3 16 3Z" />
    <path d="M21 22.5c-.38 0-.77-.15-1.06-.44l-10-10c-.59-.59-.59-1.54 0-2.12s1.54-.59 2.12 0l10 10c.59.59.59 1.54 0 2.12-.29.29-.68.44-1.06.44Z" />
    <path d="M11 22.5c-.38 0-.77-.15-1.06-.44a1.49 1.49 0 0 1 0-2.12l10-10c.59-.59 1.54-.59 2.12 0s.59 1.54 0 2.12l-10 10c-.29.29-.68.44-1.06.44Z" />
  </svg>
);

export default SvgCircleCross;
