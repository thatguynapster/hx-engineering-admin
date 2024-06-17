import { HtmlHTMLAttributes } from "react";

import { classNames } from "@/libs";

export interface BadgeProps extends HtmlHTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "info" | "warning" | "success" | string;
}

export function Badge({ className, children, variant, ...props }: BadgeProps) {
  /**
   * variant
   */
  variant = (() => {
    if (!variant) return "";
    return variant?.toLowerCase();
  })();

  return (
    <span
      className={classNames(
        `badge`,
        ["info", "primary"].includes(variant) &&
          `bg-info/20 text-info dark:bg-info `,
        ["pending", "warning"].includes(variant) &&
          "bg-warning/20 text-warning dark:bg-warning ",
        ["success"].includes(variant) &&
          "bg-success/20 text-success dark:bg-success ",
        ["danger"].includes(variant) &&
          "bg-error/20 text-danger dark:bg-error ",
        "rounded-full dark:text-white",
        "px-3 py-0.5",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
