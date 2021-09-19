import * as React from "react";

function SvgWarningIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 6v12" />
      <circle cx={16} cy={16} r={15} />
      <circle cx={16} cy={24} r={2} />
    </svg>
  );
}

export default SvgWarningIcon;
