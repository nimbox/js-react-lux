import * as React from "react";

function SvgCirclePlus(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 16h20M16 6v20" />
      <circle cx={16} cy={16} r={15} />
    </svg>
  );
}

export default SvgCirclePlus;
