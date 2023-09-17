import * as React from "react";
import type { SVGProps } from "react";
const SvgDanger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M16.75 16.664c-.412.185-1.087.185-1.5 0-.412-.184-.75-1.614-.75-2.164V11c0-.55.184-1.41.409-1.913 0 0 .263-.587 1.091-.587s1.091.587 1.091.587c.225.502.409 1.363.409 1.913v3.5c0 .55-.338 1.98-.75 2.164Z" />
    <circle cx={16} cy={21} r={2} />
    <path d="M22.395 31.92c-.214.044-.84.08-1.39.08h-10.01c-.55 0-1.176-.036-1.39-.08s-.99-.678-1.379-1.067l-7.08-7.08c-.388-.388-.805-.856-.926-1.038S0 21.555 0 21.005v-10.01c0-.55.036-1.176.08-1.39s.678-.99 1.067-1.379l7.08-7.08C8.614.759 9.082.342 9.264.22s1.18-.22 1.73-.22h10.01c.55 0 1.176.036 1.39.08s.99.678 1.378 1.067l7.08 7.08c.39.389.806.856.927 1.038s.22 1.18.22 1.73v10.01c0 .55-.036 1.176-.08 1.39s-.678.99-1.067 1.379l-7.08 7.08c-.389.388-1.163 1.023-1.378 1.067ZM9.908 28.294c.389.389 1.157.707 1.707.707h8.77c.55 0 1.318-.318 1.707-.707l6.2-6.201c.39-.389.708-1.157.708-1.707v-8.77c0-.55-.318-1.318-.707-1.707l-6.201-6.2c-.39-.39-1.157-.708-1.707-.708h-8.77c-.55 0-1.318.318-1.707.707l-6.2 6.201c-.39.389-.708 1.157-.708 1.707v8.77c0 .55.318 1.318.707 1.707l6.201 6.2Z" />
  </svg>
);
export default SvgDanger;
