import * as React from "react";

function SvgWaffleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
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
      <circle cx={8} cy={8} r={2} />
      <circle cx={16} cy={8} r={2} />
      <circle cx={24} cy={8} r={2} />
      <circle cx={8} cy={16} r={2} />
      <circle cx={16} cy={16} r={2} />
      <circle cx={24} cy={16} r={2} />
      <circle cx={8} cy={24} r={2} />
      <circle cx={16} cy={24} r={2} />
      <circle cx={24} cy={24} r={2} />
    </svg>
  );
}

export default SvgWaffleIcon;
