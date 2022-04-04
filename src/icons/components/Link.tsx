import * as React from "react";
import { SVGProps } from "react";

const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M9.5 29.5c-1.74 0-3.37-.68-4.6-1.9S3 24.74 3 23s.68-3.37 1.9-4.6l4.95-4.95c2.53-2.53 6.66-2.53 9.19 0 .59.58.59 1.54 0 2.12s-1.54.59-2.12 0a3.513 3.513 0 0 0-4.95 0l-4.95 4.95c-.66.66-1.03 1.54-1.03 2.47s.36 1.81 1.03 2.47c1.32 1.32 3.63 1.32 4.95 0l2.83-2.83c.59-.59 1.54-.59 2.12 0s.59 1.54 0 2.12l-2.83 2.83a6.45 6.45 0 0 1-4.6 1.9Z" />
    <path d="M17.55 20.45c-1.66 0-3.33-.63-4.6-1.9-.59-.58-.59-1.54 0-2.12s1.54-.59 2.12 0a3.504 3.504 0 0 0 4.95 0l4.95-4.95c.66-.66 1.03-1.54 1.03-2.47s-.36-1.81-1.03-2.47c-1.32-1.32-3.63-1.32-4.95 0l-2.83 2.83c-.59.59-1.54.59-2.12 0s-.59-1.54 0-2.12l2.83-2.83c1.23-1.23 2.86-1.9 4.6-1.9s3.37.68 4.6 1.9S29 7.28 29 9.02s-.68 3.37-1.9 4.6l-4.95 4.95a6.471 6.471 0 0 1-4.6 1.9Z" />
  </svg>
);

export default SvgLink;