import * as React from "react";
import { SVGProps } from "react";

const SvgPhone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M22.6 28.5c-10.532 0-19.1-8.568-19.1-19.1 0-3.906 3.835-6.98 7.87-5.544a1.5 1.5 0 0 1 .96 1.082l1.643 7.242a1.5 1.5 0 0 1-.402 1.392 5.857 5.857 0 0 1-3.179 1.632 1.5 1.5 0 0 1-.504-2.957c.34-.058.66-.17.949-.332L9.611 6.509C7.912 6.36 6.5 7.73 6.5 9.4c0 8.877 7.222 16.1 16.1 16.1a2.903 2.903 0 0 0 2.89-3.111l-5.405-1.225a2.95 2.95 0 0 0-.333.948 1.5 1.5 0 1 1-2.957-.504 5.857 5.857 0 0 1 1.63-3.178 1.5 1.5 0 0 1 1.393-.403l7.243 1.642a1.5 1.5 0 0 1 1.082.96c.24.676.356 1.32.356 1.97 0 3.254-2.646 5.9-5.9 5.9Z" />
  </svg>
);

export default SvgPhone;
