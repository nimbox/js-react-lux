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
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx={12.5} cy={12.5} r={11.5} />
      <path d="M31.5 31.5L21.384 21.384" />
    </svg>
  );
}

export default SvgSearchIcon;
