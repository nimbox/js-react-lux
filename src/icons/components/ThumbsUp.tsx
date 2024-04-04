import * as React from "react";
import type { SVGProps } from "react";
const SvgThumbsUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M5.5 32.036h-2c-1.93 0-3.5-1.57-3.5-3.5V13.5C0 11.57 1.57 10 3.5 10h2C7.43 10 9 11.57 9 13.5v15.036c0 1.93-1.57 3.5-3.5 3.5M3.5 13c-.275 0-.5.225-.5.5v15.036c0 .275.225.5.5.5h2c.275 0 .5-.225.5-.5V13.5c0-.275-.225-.5-.5-.5z" />
    <path d="M21.5 32c-2.843 0-5.804-.616-8.416-1.161-2.114-.441-4.108-.867-5.566-.839H7.5a1.5 1.5 0 0 1-.018-3c1.752-.019 3.934.427 6.213.902 2.592.54 5.27 1.098 7.805 1.098 4.836 0 7.5 0 7.5-11.5 0-1.686-.41-2.914-1.218-3.65-1.509-1.368-4.35-1.099-6.048-.936-.508.049-.931.086-1.234.086a1.5 1.5 0 0 1-1.423-1.975c1.22-3.659.688-6.499-.32-7.59-.49-.528-1.092-.68-1.893-.48-.892.223-1.035.502-1.28 2.492-.331 2.696-.832 6.768-7.528 9.446a1.5 1.5 0 1 1-1.113-2.785c5.048-2.02 5.36-4.565 5.664-7.027.235-1.91.528-4.286 3.529-5.036 1.874-.467 3.58.013 4.822 1.353 1.696 1.832 2.236 4.95 1.536 8.439 2.134-.15 5.195-.125 7.306 1.794 1.46 1.327 2.2 3.302 2.2 5.869C32 29.906 28.76 32 21.5 32" />
  </svg>
);
export default SvgThumbsUp;
