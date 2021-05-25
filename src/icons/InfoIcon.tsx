import * as React from "react";

function SvgInfoIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx={16} cy={8} r={2} />
      <path d="M14 14h2v12h2" />
      <circle cx={16} cy={16} r={15} />
    </svg>
  );
}

export default SvgInfoIcon;
