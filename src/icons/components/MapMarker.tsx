import type { SVGProps } from "react";
const SvgMapMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <circle cx={16} cy={14.5} r={4} />
    <path d="M16 31c-.36 0-.72-.129-1.006-.387l-7.75-7.003a1.5 1.5 0 0 1-.154-.162A13.02 13.02 0 0 1 3 14C3 6.832 8.832 1 16 1s13 5.832 13 13a13.02 13.02 0 0 1-4.094 9.451q-.069.085-.15.16l-7.75 7.002A1.5 1.5 0 0 1 16 31Zm-6.593-9.48L16 27.478l6.596-5.96a2 2 0 0 1 .134-.14A10.02 10.02 0 0 0 26 14c0-5.514-4.486-10-10-10S6 8.486 6 14a10.02 10.02 0 0 0 3.27 7.379q.075.067.137.142" />
  </svg>
);
export default SvgMapMarker;
