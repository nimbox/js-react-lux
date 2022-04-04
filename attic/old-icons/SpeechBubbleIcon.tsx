import * as React from "react";
import { SVGProps } from "react";

const SvgSpeechBubbleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 6C9.4 6 4 9.6 4 14c0 2.1 1.2 4 3.2 5.4l-1.8 5.8 8.1-3.4c.8.1 1.6.2 2.5.2 6.6 0 12-3.6 12-8s-5.4-8-12-8z" />
  </svg>
);

export default SvgSpeechBubbleIcon;
