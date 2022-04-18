import * as React from "react";
import { SVGProps } from "react";

const SvgMegaphone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M30.5 21c-.2 0-.4-.04-.59-.12-.07-.03-6.84-2.86-16.33-2.38H8c-4.41 0-8-3.59-8-8s3.59-8 8-8h5.58C23.05 2.97 29.84.15 29.91.12A1.5 1.5 0 0 1 32 1.5v18c0 .5-.25.97-.67 1.25-.25.16-.54.25-.83.25Zm-14.68-5.56c5.95 0 10.64 1.14 13.18 1.94V3.62c-2.86.89-8.46 2.22-15.54 1.88H8c-2.76 0-5 2.24-5 5s2.24 5 5 5h5.5c.79-.04 1.57-.06 2.32-.06Z" />
    <path d="M11.5 32c-1.44 0-2.72-.58-3.69-1.67-3.29-3.67-2.41-12.5-2.3-13.5.09-.82.82-1.42 1.66-1.32.82.09 1.42.83 1.33 1.66-.36 3.25-.25 9.15 1.55 11.17.41.46.86.67 1.46.67.69 0 1.58-.09 1.93-.54.69-.87.09-3.39-.43-5.63-.46-1.96-.94-3.98-.9-5.86.06-3.44 0-12.87 0-12.96 0-.83.66-1.5 1.49-1.51.82 0 1.49.67 1.5 1.49 0 .1.06 9.56 0 13.04-.03 1.51.41 3.34.82 5.12.75 3.17 1.45 6.17-.14 8.18-.88 1.11-2.32 1.68-4.28 1.68Z" />
  </svg>
);

export default SvgMegaphone;
