import * as React from "react";

function SvgEditIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 26h10.5M21.3 6.7c1-1 2.5-1 3.5 0s1 2.5 0 3.5L10.2 24.8 5.5 26l1.2-4.7L21.3 6.7z" />
    </svg>
  );
}

export default SvgEditIcon;
