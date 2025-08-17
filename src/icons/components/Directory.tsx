import type { SVGProps } from "react";
const SvgDirectory = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.5 30h-25C1.57 30 0 28.43 0 26.5v-21C0 3.57 1.57 2 3.5 2h8.049c.716 0 1.398.308 1.874.845l2.754 3.121H28.5c1.93 0 3.5 1.57 3.5 3.5V26.5c0 1.93-1.57 3.5-3.5 3.5M3.5 5a.5.5 0 0 0-.5.5v21a.5.5 0 0 0 .5.5h25a.5.5 0 0 0 .5-.5V9.466a.5.5 0 0 0-.5-.5H15.951a2.5 2.5 0 0 1-1.872-.843L11.323 5z" />
  </svg>
);
export default SvgDirectory;
