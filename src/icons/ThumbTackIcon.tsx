import * as React from "react";

function SvgThumbTackIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 20v6M17.9 7.4l1.4 8.2c2.5.7 4.4 2.3 4.7 4.3h-4l-8 .1H8c.4-2 2.3-3.6 4.7-4.3l1.4-8.2s-1.3-.7-1.3-.9v-.2c0-.2.3-.3.5-.3h5.2c.3-.1.5.1.5.2v.2c.2.2-1.1.9-1.1.9z" />
    </svg>
  );
}

export default SvgThumbTackIcon;
