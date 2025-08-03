import * as React from "react";
import type { SVGProps } from "react";
const SvgArchive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.236 29.78h-25c-1.93 0-3.5-1.57-3.5-3.5v-21c0-1.93 1.57-3.5 3.5-3.5h8.05c.717 0 1.4.31 1.874.848l2.753 3.119h12.323c1.93 0 3.5 1.57 3.5 3.5V26.28c0 1.93-1.57 3.5-3.5 3.5m-25-25a.5.5 0 0 0-.5.5v21a.5.5 0 0 0 .5.5h25a.5.5 0 0 0 .5-.5V9.247a.5.5 0 0 0-.5-.5H15.688c-.718 0-1.4-.309-1.876-.847L11.06 4.78z" />
    <path d="M16 24.5c-.384 0-.768-.146-1.06-.44l-4-4a1.5 1.5 0 1 1 2.12-2.12L16 20.878l2.94-2.94a1.5 1.5 0 1 1 2.12 2.121l-4 4c-.292.293-.676.44-1.06.44Z" />
    <path d="M16 24.5a1.5 1.5 0 0 1-1.5-1.5V13a1.5 1.5 0 0 1 3 0v10a1.5 1.5 0 0 1-1.5 1.5" />
  </svg>
);
export default SvgArchive;
