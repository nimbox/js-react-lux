import * as React from "react";

function SvgCrossIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.5em"
      height="0.5em"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      style={{ width: '0.5em', height: '0.5em' }}
    >
      <path d="M8 8l16 16M24 8L8 24" />
    </svg>
  );
}

export default SvgCrossIcon;
