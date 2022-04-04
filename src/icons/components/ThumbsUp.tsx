import * as React from "react";
import { SVGProps } from "react";

const SvgThumbsUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M5.5 32.04h-2c-1.93 0-3.5-1.57-3.5-3.5V13.5C0 11.57 1.57 10 3.5 10h2C7.43 10 9 11.57 9 13.5v15.04c0 1.93-1.57 3.5-3.5 3.5ZM3.5 13c-.28 0-.5.22-.5.5v15.04c0 .28.22.5.5.5h2c.28 0 .5-.22.5-.5V13.5c0-.28-.22-.5-.5-.5h-2Z" />
    <path d="M21.5 32c-2.84 0-5.8-.62-8.42-1.16-2.11-.44-4.11-.87-5.57-.84h-.02a1.5 1.5 0 0 1-1.5-1.48c0-.83.65-1.51 1.48-1.52 1.75-.02 3.93.43 6.21.9 2.59.54 5.27 1.1 7.8 1.1 4.84 0 7.5 0 7.5-11.5 0-1.69-.41-2.91-1.22-3.65-1.51-1.37-4.35-1.1-6.05-.94-.51.05-.93.09-1.23.09-.48 0-.93-.23-1.22-.62a1.51 1.51 0 0 1-.21-1.35c1.22-3.66.69-6.5-.32-7.59-.49-.53-1.09-.68-1.89-.48-.89.22-1.04.5-1.28 2.49-.33 2.7-.83 6.77-7.53 9.45a1.5 1.5 0 1 1-1.11-2.79c5.05-2.02 5.36-4.56 5.66-7.03.23-1.91.53-4.29 3.53-5.04 1.87-.47 3.58.01 4.82 1.35 1.7 1.83 2.24 4.95 1.54 8.44 2.13-.15 5.2-.12 7.31 1.79 1.46 1.33 2.2 3.3 2.2 5.87 0 12.41-3.24 14.5-10.5 14.5Z" />
  </svg>
);

export default SvgThumbsUp;