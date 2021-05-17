import * as React from "react";

function SvgOrganizationIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path
        className="organization-icon_svg__st0"
        d="M16 11V7H6v18h20V11H16zm-6 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2v-2h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
      />
    </svg>
  );
}

export default SvgOrganizationIcon;
