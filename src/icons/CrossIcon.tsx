import * as React from "react";

function SvgCrossIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path className="cross-icon_svg__st0" d="M6 6l20 20M26 6L6 26" />
    </svg>
  );
}

export default SvgCrossIcon;
