import * as React from "react";
import type { SVGProps } from "react";
const SvgImage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path
      fill="#231f20"
      d="M1.501 26a1.5 1.5 0 0 1-.977-2.639l7-6a1.5 1.5 0 0 1 1.647-.203l4.863 2.432 7.253-9.972A1.5 1.5 0 0 1 22.466 9c.433-.032.913.196 1.205.562l8 10a1.5 1.5 0 1 1-2.342 1.874l-6.772-8.465-6.844 9.41a1.5 1.5 0 0 1-1.884.46l-5.11-2.555-6.242 5.352c-.284.243-.631.361-.976.361Z"
    />
    <circle cx={8} cy={12} r={2} />
    <path d="M28.5 28h-25C1.57 28 0 26.43 0 24.5v-17C0 5.57 1.57 4 3.5 4h25C30.43 4 32 5.57 32 7.5v17c0 1.93-1.57 3.5-3.5 3.5M3.5 7a.5.5 0 0 0-.5.5v17a.5.5 0 0 0 .5.5h25a.5.5 0 0 0 .5-.5v-17a.5.5 0 0 0-.5-.5z" />
  </svg>
);
export default SvgImage;
