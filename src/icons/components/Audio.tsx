import type { SVGProps } from "react";
const SvgAudio = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 18.5c-2.757 0-5-2.243-5-5v-8c0-2.757 2.243-5 5-5s5 2.243 5 5v8c0 2.757-2.243 5-5 5m0-15c-1.102 0-2 .897-2 2v8c0 1.103.898 2 2 2s2-.897 2-2v-8c0-1.103-.897-2-2-2M16 31.5a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 3 0V30a1.5 1.5 0 0 1-1.5 1.5" />
    <path d="M20.5 31.5h-9a1.5 1.5 0 0 1 0-3h9a1.5 1.5 0 0 1 0 3M16.01 24C10.48 24 6 19.519 6 14.01c0-.828.672-1.505 1.5-1.505S9 13.172 9 14v.01A7 7 0 0 0 15.99 21c3.874 0 7.01-3.136 7.01-6.99 0-.828.672-1.505 1.5-1.505S26 13.172 26 14c0 5.519-4.481 10-9.99 10" />
  </svg>
);
export default SvgAudio;
