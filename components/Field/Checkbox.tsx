import { CheckIcon } from "@heroicons/react/24/outline";
import { InputHTMLAttributes } from "react";
import { Field } from "formik";
import { classNames } from "@/libs";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  withFormik?: boolean;
}

export function Checkbox({
  children,
  className,
  withFormik = true,
  checked: isChecked,
  ...props
}: CheckboxProps) {
  /**
   * variables
   */
  const Input = withFormik ? Field : "input";

  return (
    <label
      className={classNames(
        className,
        "inline-flex gap-2 items-center relative cursor-pointer"
      )}
    >
      <Input
        {...props}
        type="checkbox"
        checked={isChecked}
        className="sr-only peer cursor-pointer"
      />
      <div
        className={classNames(
          "w-4 h-4",
          "flex rounded border-2 transition border-neutral-200",
          "peer-checked:bg-primary peer-checked:bg-secondary-main peer-checked:border-primary peer-checked:border-secondary-main"
        )}
      >
        <CheckIcon
          className={classNames(
            isChecked ? "text-white" : "text-transparent",
            "w-3 h-3 m-auto stroke-[2.5px]"
          )}
        />
      </div>
      <div className="text-sm text-neutral-700 select-none">{children}</div>
    </label>
  );
}

export default Checkbox;
