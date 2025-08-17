import type { SVGProps } from "react";
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M26.5 32h-21C3.57 32 2 30.43 2 28.5v-21C2 5.57 3.57 4 5.5 4h21C28.43 4 30 5.57 30 7.5v21c0 1.93-1.57 3.5-3.5 3.5M5.5 7a.5.5 0 0 0-.5.5v21a.5.5 0 0 0 .5.5h21a.5.5 0 0 0 .5-.5v-21a.5.5 0 0 0-.5-.5z" />
    <path d="M9 7a1.5 1.5 0 0 1-1.5-1.5v-4a1.5 1.5 0 0 1 3 0v4A1.5 1.5 0 0 1 9 7M23 7a1.5 1.5 0 0 1-1.5-1.5v-4a1.5 1.5 0 0 1 3 0v4A1.5 1.5 0 0 1 23 7M28.5 15h-25a1.5 1.5 0 0 1 0-3h25a1.5 1.5 0 0 1 0 3" />
  </svg>
);
export default SvgCalendar;
