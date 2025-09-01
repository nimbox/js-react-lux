import type { SVGProps } from "react";
const SvgVideo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M21.052 25.5H2.948C1.322 25.5 0 24.144 0 22.477V9.524C0 7.856 1.322 6.5 2.948 6.5h18.104C22.678 6.5 24 7.856 24 9.523v12.954c0 1.667-1.322 3.023-2.948 3.023M2.948 9.5 3 11.231v11.246l17.988.023L21 9.523z" />
    <path d="M30.5 23q-.182 0-.364-.045l-8-2A1.5 1.5 0 0 1 21 19.5v-7a1.5 1.5 0 0 1 1.136-1.455l8-2A1.497 1.497 0 0 1 32 10.5v11a1.5 1.5 0 0 1-1.5 1.5M24 18.33l5 1.25v-7.16l-5 1.25z" />
  </svg>
);
export default SvgVideo;
