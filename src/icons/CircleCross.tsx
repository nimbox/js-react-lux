import * as React from "react";

function SvgCircleCross(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 8l16 16M24 8L8 24" />
      <circle cx={16} cy={16} r={15} />
    </svg>
  );
}

export default SvgCircleCross;
