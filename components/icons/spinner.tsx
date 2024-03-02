import { classNames } from "@/libs";
import { SVGProps } from "react";
import { Template } from "./Template";

export interface SpinnerProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function Spinner({ size = 20, className, ...props }: SpinnerProps) {
  return (
    <Template {...{ size, className, props }}>
      <path
        d="M12.7071 5.70711C13.0976 5.31658 13.0976 4.68342 12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289L4.29289 11.2929C3.90237 11.6834 3.90237 12.3166 4.29289 12.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071C13.0976 19.3166 13.0976 18.6834 12.7071 18.2929L7.41421 13L19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L7.41421 11L12.7071 5.70711Z"
        fill="currentColor"
      />
    </Template>
  );
}
