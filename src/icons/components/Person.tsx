import * as React from "react";
import { SVGProps } from "react";

const SvgPerson = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M16 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Z" />
    <path d="M26.5 28.5c-.83 0-1.5-.67-1.5-1.5 0-4.96-4.04-9-9-9s-9 4.04-9 9c0 .83-.67 1.5-1.5 1.5S4 27.83 4 27c0-6.62 5.38-12 12-12s12 5.38 12 12c0 .83-.67 1.5-1.5 1.5Z" />
  </svg>
);

export default SvgPerson;
