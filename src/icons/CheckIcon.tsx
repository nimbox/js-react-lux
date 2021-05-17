import * as React from "react";

function SvgCheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path className="check-icon_svg__st0" d="M26 8.5L13 24l-7-8.5" />
    </svg>
  );
}

export default SvgCheckIcon;
