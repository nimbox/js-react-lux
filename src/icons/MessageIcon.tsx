import * as React from "react";

function SvgMessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.5}
      {...props}
    >
      <path d="M17.388 4.751H2.613a.39.39 0 00-.389.389v9.72c0 .216.175.389.389.389h14.775a.389.389 0 00.389-.389V5.14a.39.39 0 00-.389-.389m-.94.779L10 11.984 3.552 5.53h12.896zm-13.446.551l3.921 3.925-3.921 3.925v-7.85zm.558 8.39l3.914-3.916 2.253 2.253a.385.385 0 00.548 0l2.253-2.253 3.913 3.916H3.56zm13.439-.54l-3.921-3.925 3.921-3.925v7.85z" />
    </svg>
  );
}

export default SvgMessageIcon;
