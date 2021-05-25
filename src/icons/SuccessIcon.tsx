import * as React from "react";

function SvgSuccessIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path className="success-icon_svg__st0" d="M25 9L13.3 23 7 15.3" />
      <circle className="success-icon_svg__st0" cx={16} cy={16} r={15} />
    </svg>
  );
}

export default SvgSuccessIcon;
