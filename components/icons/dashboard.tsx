import { classNames } from "@/libs";
import { SVGProps } from "react";
import { Template } from "./Template";

export interface DashboardProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function Dashboard({ size = 20, className, ...props }: DashboardProps) {
  return (
    <Template {...{ size, className, props }}>
      <path
        d="M8 19H3C1.89543 19 1 18.1046 1 17V10.2969C1 9.78521 1.19615 9.29295 1.54809 8.92146L8.54809 1.53257C9.33695 0.699887 10.663 0.699886 11.4519 1.53257L18.4519 8.92146C18.8038 9.29295 19 9.78521 19 10.2969V17C19 18.1046 18.1046 19 17 19H12M8 19V13.5C8 13.2239 8.22386 13 8.5 13H11.5C11.7761 13 12 13.2239 12 13.5V19M8 19H12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </Template>
  );
}
