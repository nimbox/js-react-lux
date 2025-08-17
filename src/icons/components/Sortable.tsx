import type { SVGProps } from "react";
const SvgSortable = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M22.5 26a1.5 1.5 0 0 1-1.5-1.5v-17a1.5 1.5 0 0 1 3 0v17a1.5 1.5 0 0 1-1.5 1.5" />
    <path d="M22.5 26c-.316 0-.634-.1-.9-.3l-4-3a1.501 1.501 0 0 1 1.8-2.4l3.1 2.325 3.1-2.325a1.501 1.501 0 0 1 1.8 2.4l-4 3c-.266.2-.584.3-.9.3M9.5 26A1.5 1.5 0 0 1 8 24.5v-17a1.5 1.5 0 0 1 3 0v17A1.5 1.5 0 0 1 9.5 26" />
    <path d="M13.499 12c-.313 0-.629-.098-.9-.3L9.5 9.375 6.4 11.7a1.5 1.5 0 1 1-1.8-2.4l4-3a1.5 1.5 0 0 1 1.8 0l4 3A1.501 1.501 0 0 1 13.5 12" />
  </svg>
);
export default SvgSortable;
