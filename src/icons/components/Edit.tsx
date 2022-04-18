import * as React from "react";
import { SVGProps } from "react";

const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M3.45 30.05c-.39 0-.77-.15-1.06-.44A1.52 1.52 0 0 1 2.05 28l3.18-8.13c.08-.19.19-.37.34-.51L17.94 6.98a1.49 1.49 0 0 1 2.12 0l4.95 4.95c.59.59.59 1.54 0 2.12L12.64 26.42c-.15.15-.32.26-.51.34L4 29.94c-.18.07-.36.1-.55.1Zm4.46-8.79-1.82 4.65 4.65-1.82L21.83 13 19 10.17 7.91 21.26Z" />
    <path d="m25.02 14.06-2.12-2.12 3.18-3.18a.512.512 0 0 0 0-.7l-2.12-2.12a.512.512 0 0 0-.7 0l-3.18 3.18L17.96 7l3.18-3.18c1.32-1.32 3.63-1.32 4.95 0l2.12 2.12c.66.66 1.02 1.54 1.02 2.47s-.36 1.82-1.02 2.48l-3.18 3.18Z" />
  </svg>
);

export default SvgEdit;
