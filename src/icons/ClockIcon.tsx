import * as React from "react";

function SvgClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
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
      <circle cx={16.5} cy={16.5} r={10} />
      <path className="clock-icon_svg__cls-1" d="M16.5 10.5v6h3" />
    </svg>
  );
}

export default SvgClockIcon;
