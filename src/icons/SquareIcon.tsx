import * as React from "react";

function SvgSquareIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path className="square-icon_svg__st0" d="M6 6h20v20H6z" />
    </svg>
  );
}

export default SvgSquareIcon;
