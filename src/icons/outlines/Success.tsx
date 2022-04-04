import * as React from "react";
import { SVGProps } from "react";

const SvgSuccess = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M14 22.5a1.5 1.5 0 0 1-1.17-.56l-4-5c-.52-.65-.41-1.59.23-2.11.65-.52 1.59-.41 2.11.23L14 18.6l6.83-8.54c.52-.65 1.46-.75 2.11-.23.65.52.75 1.46.23 2.11l-8 10c-.28.36-.71.56-1.17.56Z" />
    <path d="M16 32C7.18 32 0 24.82 0 16S7.18 0 16 0s16 7.18 16 16-7.18 16-16 16Zm0-29C8.83 3 3 8.83 3 16s5.83 13 13 13 13-5.83 13-13S23.17 3 16 3Z" />
  </svg>
);

export default SvgSuccess;
