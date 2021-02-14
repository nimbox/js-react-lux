import * as React from "react";

function SvgSearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx={14.5} cy={14.5} r={8.5} />
      <path d="M26 26l-5.5-5.5" />
    </svg>
  );
}

export default SvgSearchIcon;
