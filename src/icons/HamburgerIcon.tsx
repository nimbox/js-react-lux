import * as React from "react";

function SvgHamburgerIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path
        className="hamburger-icon_svg__st0"
        d="M24 10H8c-1.1 0-2-.9-2-2v0c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2zM24 18H8c-1.1 0-2-.9-2-2v0c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2zM24 26H8c-1.1 0-2-.9-2-2v0c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2z"
      />
    </svg>
  );
}

export default SvgHamburgerIcon;
