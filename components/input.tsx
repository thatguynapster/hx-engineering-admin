import { forwardRef } from "react";
import { Field, FieldAttributes } from "formik";
import { classNames } from "@/libs";

export interface InputProps extends FieldAttributes<any> {
  withFormik?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, withFormik = true, ...props }, ref) => {
    /**
     * variables
     */
    const Component = withFormik ? Field : "input";

    return (
      <Component
        ref={ref}
        className={classNames(
          className,
          "text-sm h-full w-full px-4",
          "bg-transparent !outline-0 !outline-none !border-0 rounded-md",
          "disabled:bg-neutral-50 disabled:text-neutral-400",
          "placeholder:text-neutral-400 placeholder:text-xl"
        )}
        {...props}
      />
    );
  }
);
