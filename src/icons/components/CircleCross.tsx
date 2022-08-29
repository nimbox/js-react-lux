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
    <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16-7.178 16-16 16Zm0-29C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3Z" />
    <path d="M21 22.5c-.384 0-.768-.146-1.06-.44l-10-10a1.5 1.5 0 1 1 2.12-2.12l10 10A1.5 1.5 0 0 1 21 22.5Z" />
    <path d="M11 22.5a1.5 1.5 0 0 1-1.06-2.56l10-10a1.5 1.5 0 1 1 2.12 2.12l-10 10c-.292.293-.676.44-1.06.44Z" />
  </svg>
);

export default SvgCircleCross;
