import * as React from "react";

function SvgThumbTackIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 20v6M24 20c-.4-2-2.3-3.6-4.7-4.3l-.4-8.2s1.6-.5 1.6-1-1-.4-1-.4h-7s-1-.1-1 .4 1.6 1 1.6 1l-.4 8.2C10.3 16.4 8.4 18 8 20h16z" />
    </svg>
  );
}

export default SvgThumbTackIcon;
