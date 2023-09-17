import * as React from "react";
import type { SVGProps } from "react";
const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M27 9.5H5a1.5 1.5 0 0 1 0-3h22a1.5 1.5 0 0 1 0 3ZM21 32H11c-1.867 0-3.506-1.452-3.73-3.306L5.51 14.181a1.5 1.5 0 0 1 2.98-.362l1.759 14.515c.04.336.412.666.751.666h10c.339 0 .71-.33.751-.665l1.76-14.516a1.5 1.5 0 0 1 2.978.362l-1.76 14.514C24.506 30.548 22.867 32 21 32Z" />
    <path d="M21 9.5A1.5 1.5 0 0 1 19.5 8V3.5c0-.271-.229-.5-.5-.5h-6c-.272 0-.5.229-.5.5V8a1.5 1.5 0 0 1-3 0V3.5C9.5 1.57 11.07 0 13 0h6c1.93 0 3.5 1.57 3.5 3.5V8A1.5 1.5 0 0 1 21 9.5Z" />
  </svg>
);
export default SvgTrash;
