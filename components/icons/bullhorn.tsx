import { classNames } from "@/libs";
import { SVGProps } from "react";
import { IconProps, Template } from "./template";

export function Bullhorn({ size = 20, className, ...props }: IconProps) {
  return (
    <Template {...{ size, className, props }}>
      <path
        d="m21,6.603V0h-1c0,3.807-5.415,4-6.5,4H2.5c-1.378,0-2.5,1.122-2.5,2.5v6c0,1.334,1.05,2.427,2.367,2.496l3.283,9.004h2.099c.765,0,1.47-.383,1.887-1.024.417-.642.48-1.442.181-2.114l-2.199-5.862h5.883c1.085,0,6.5.193,6.5,4h1v-6.397c1.654,0,3-1.346,3-3s-1.346-3-3-3Zm-12.109,14.638c.173.389.137.834-.094,1.191-.232.356-.624.569-1.049.569h-1.398l-2.917-8h3.116l2.342,6.24Zm-.891-7.24H2.5c-.827,0-1.5-.673-1.5-1.5v-6c0-.827.673-1.5,1.5-1.5h5.5v9Zm12,2.254c-1.415-1.622-4.097-2.254-6.5-2.254h-4.5V5h4.5c2.403,0,5.085-.632,6.5-2.254v13.508Zm1-4.652v-4c1.103,0,2,.897,2,2s-.897,2-2,2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.2"
      />
    </Template>
  );
}
