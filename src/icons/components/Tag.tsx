import * as React from "react";
import { SVGProps } from "react";

const SvgTag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M17.884 31.927c-.211.04-.557.04-.768 0s-1.313-1.003-2.09-1.78L3.853 18.974c-.778-.778-1.513-1.564-1.634-1.746S2 15.6 2 14.5v-9c0-1.1.151-2.337.336-2.75S4.4 2 5.5 2h9c1.1 0 2.175.036 2.39.08s1.307.996 2.085 1.774l11.171 11.171c.778.778 1.546 1.76 1.708 2.182s-.93 1.99-1.708 2.768L19.975 30.146c-.778.778-1.88 1.74-2.091 1.78ZM5 13.879c0 1.1.636 2.636 1.414 3.414l9.672 9.672c.778.778 2.05.778 2.828 0l8.05-8.05a2.006 2.006 0 0 0 0-2.83l-9.67-9.67C16.514 5.635 14.978 5 13.878 5H7c-1.1 0-2 .9-2 2v6.879Z" />
    <circle cx={12} cy={12} r={2.5} />
  </svg>
);

export default SvgTag;
