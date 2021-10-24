import * as React from "react";

function SvgBoardIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4.5 6.5h5v10h-5zM13.5 6.5h5v19h-5zM22.5 6.5h5v15h-5z" />
    </svg>
  );
}

export default SvgBoardIcon;
