import * as React from "react";

function SvgThumbsUpIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18.1 13V9c0-1.7-1.3-3-3-3l-4 9v11h11.3c1 0 1.8-.7 2-1.7l1.4-9c.2-1.1-.6-2.1-1.7-2.3h-6zm-6.9 13h-3c-1.1 0-2-.9-2-2v-7c0-1.1.9-2 2-2h3" />
    </svg>
  );
}

export default SvgThumbsUpIcon;
