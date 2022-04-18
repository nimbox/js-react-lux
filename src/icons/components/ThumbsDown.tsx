import * as React from "react";
import { SVGProps } from "react";

const SvgThumbsDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M28.5 22h-2c-1.93 0-3.5-1.57-3.5-3.5v-15C23 1.57 24.57 0 26.5 0h2C30.43 0 32 1.57 32 3.5v15c0 1.93-1.57 3.5-3.5 3.5Zm-2-19c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h2c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-2Z" />
    <path d="M14.5 32.13c-1.33 0-2.53-.52-3.46-1.53-1.7-1.83-2.24-4.95-1.54-8.44-2.13.15-5.2.12-7.31-1.79-1.46-1.33-2.2-3.3-2.2-5.87C0 2.09 3.24 0 10.5 0c2.84 0 5.8.62 8.42 1.16 2.07.43 4.03.84 5.48.84h.1c.82 0 1.49.66 1.5 1.48 0 .83-.65 1.51-1.48 1.52-1.77 0-3.93-.43-6.21-.9-2.59-.54-5.27-1.1-7.8-1.1-4.84 0-7.5 0-7.5 11.5 0 1.69.41 2.91 1.22 3.65 1.51 1.37 4.35 1.1 6.05.94.51-.05.93-.09 1.23-.09.48 0 .93.23 1.22.62.28.39.36.89.21 1.35-1.22 3.66-.69 6.5.32 7.59.49.53 1.09.68 1.89.48.89-.22 1.04-.5 1.28-2.49.33-2.7.83-6.77 7.53-9.45a1.5 1.5 0 1 1 1.11 2.79c-5.05 2.02-5.36 4.56-5.66 7.03-.23 1.91-.53 4.29-3.53 5.04-.47.12-.92.17-1.36.17Z" />
  </svg>
);

export default SvgThumbsDown;
