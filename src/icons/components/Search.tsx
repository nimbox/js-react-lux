import * as React from "react";
import { SVGProps } from "react";

const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M14 26C7.38 26 2 20.62 2 14S7.38 2 14 2s12 5.38 12 12-5.38 12-12 12Zm0-21c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9Z" />
    <path d="M28.5 30c-.38 0-.77-.15-1.06-.44l-7-7a1.49 1.49 0 0 1 0-2.12 1.49 1.49 0 0 1 2.12 0l7 7c.59.59.59 1.54 0 2.12-.29.29-.68.44-1.06.44Z" />
  </svg>
);

export default SvgSearch;
