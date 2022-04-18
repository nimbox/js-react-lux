import * as React from "react";
import { SVGProps } from "react";

const SvgMention = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 24c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Z" />
    <path d="M16 32C7.18 32 0 24.82 0 16S7.18 0 16 0s16 7.18 16 16v2.5c0 3.03-2.47 5.5-5.5 5.5S21 21.53 21 18.5v-2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v2a2.5 2.5 0 0 0 5 0V16c0-7.17-5.83-13-13-13S3 8.83 3 16s5.83 13 13 13c2.28 0 4.53-.6 6.5-1.74.72-.42 1.63-.17 2.05.55.41.72.17 1.63-.55 2.05A16.03 16.03 0 0 1 16 32Z" />
  </svg>
);

export default SvgMention;
