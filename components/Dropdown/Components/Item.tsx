import { forwardRef } from "react";
import DropdownItem, { DropdownItemProps } from "@restart/ui/DropdownItem";
import { classNames } from "@/libs";

export const Item = forwardRef<HTMLElement, DropdownItemProps>(
  ({ active, children, className, ...props }, ref) => {
    return (
      <DropdownItem
        ref={ref}
        className={classNames(
          "text-sm",
          "text-left",
          "px-4 py-3",
          "flex items-center",
          "hover:bg-neutral-100 transition",
          active && "bg-neutral-100",
          className
        )}
        {...props}
      >
        {children}
      </DropdownItem>
    );
  }
);

export default Item;
