import * as React from "react";
import type { SVGProps } from "react";
const SvgGlobe = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16-7.178 16-16 16Zm0-29C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3Z" />
    <path d="M16 32c-.418 0-.817-.175-1.102-.482C14.638 31.235 8.5 24.498 8.5 16S14.637.765 14.898.482c.569-.614 1.635-.614 2.204 0C17.363.765 23.5 7.502 23.5 16s-6.137 15.235-6.398 15.518A1.501 1.501 0 0 1 16 32Zm0-28.105C14.368 6.109 11.5 10.748 11.5 16s2.868 9.89 4.5 12.105c1.632-2.214 4.5-6.854 4.5-12.105S17.633 6.11 16 3.895Z" />
    <path d="M1.5 14.5h29v3h-29z" />
  </svg>
);
export default SvgGlobe;
