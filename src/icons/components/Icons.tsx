import type { SVGProps } from "react";
const SvgIcons = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path
      d="M4 27.5A1.497 1.497 0 0 1 2.5 26v-7a1.5 1.5 0 0 1 1.07-1.436L8.78 16l-5.21-1.563A1.5 1.5 0 0 1 2.5 13V6a1.5 1.5 0 0 1 2.077-1.385l24 10a1.501 1.501 0 0 1 0 2.77l-24 10A1.5 1.5 0 0 1 4 27.5m1.5-7.384v3.634L24.1 16 5.5 8.25v3.634l8.93 2.68a1.5 1.5 0 0 1 0 2.872z"
      style={{
        fill: "#000",
        strokeWidth: 0,
      }}
    />
  </svg>
);
export default SvgIcons;
