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
    <path d="M16 24c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8Zm0-13c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
    <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16v2.5c0 3.032-2.468 5.5-5.5 5.5S21 21.532 21 18.5v-2.005a1.502 1.502 0 0 1 1.5-1.498c.828 0 1.5.669 1.5 1.498V18.5c0 1.379 1.121 2.5 2.5 2.5s2.5-1.121 2.5-2.5V16c0-7.168-5.832-13-13-13S3 8.832 3 16s5.832 13 13 13c2.278 0 4.525-.603 6.499-1.741a1.5 1.5 0 1 1 1.5 2.598A16.018 16.018 0 0 1 16 32Z" />
  </svg>
);

export default SvgMention;
