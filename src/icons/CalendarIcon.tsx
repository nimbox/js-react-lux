import * as React from "react";

function SvgCalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path
        className="calendar-icon_svg__st0"
        d="M23 8h-1V6h-2v2h-8V6h-2v2H9c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 16H9V14h14v10z"
      />
      <path
        className="calendar-icon_svg__st0"
        d="M18.5 17c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z"
      />
    </svg>
  );
}

export default SvgCalendarIcon;
