import type { SVGProps } from "react";
const SvgLightBulb = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M18.5 32h-5a1.5 1.5 0 0 1 0-3h5a1.5 1.5 0 0 1 0 3M20.5 27h-9a1.5 1.5 0 0 1 0-3h9a1.5 1.5 0 0 1 0 3M20.5 22a1.5 1.5 0 0 1-1.5-1.5c0-1.713 1.164-2.953 2.29-4.15C22.622 14.93 24 13.464 24 11c0-4.411-3.589-8-8-8s-8 3.589-8 8c0 2.465 1.378 3.931 2.71 5.35C11.836 17.546 13 18.786 13 20.5a1.5 1.5 0 0 1-3 0c0-.525-.717-1.289-1.477-2.097C7.036 16.821 5 14.653 5 11 5 4.935 9.935 0 16 0s11 4.935 11 11c0 3.653-2.036 5.82-3.523 7.403-.76.808-1.477 1.572-1.477 2.097a1.5 1.5 0 0 1-1.5 1.5" />
  </svg>
);
export default SvgLightBulb;
