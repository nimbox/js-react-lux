import * as React from "react";

function SvgForwardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17.5 10.5c-8.12.31-9.79 6.85-11 13 4-4 7-5 11-4v4l8-9-8-8z" />
    </svg>
  );
}

export default SvgForwardIcon;
