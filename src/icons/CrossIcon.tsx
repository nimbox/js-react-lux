import * as React from "react";

function SvgCrossIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 6l20 20M26 6L6 26" />
    </svg>
  );
}

export default SvgCrossIcon;
