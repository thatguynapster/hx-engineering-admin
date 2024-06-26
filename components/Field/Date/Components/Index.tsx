import Flatpickr, { DateTimePickerProps } from "react-flatpickr";
import dayjs from "dayjs";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/libs";

// eslint-disable-next-line
export interface DateProps extends DateTimePickerProps {
  setFieldValue: (
    field: string,
    value: number,
    shouldValidate?: boolean
  ) => void;
  setFieldTouched?: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  dateFormats?: string;
}

export function Date({
  name,
  value,
  options,
  className,
  setFieldValue,
  setFieldTouched,
  dateFormats,
  ...props
}: DateProps) {
  return (
    <>
      <span className="block pl-4">
        <CalendarIcon className="w-5 h-5 text-muted" />
      </span>

      <Flatpickr
        value={value ? dayjs(value as string).toDate() : ""}
        className={classNames(className, "input block pl-1")}
        options={{
          ...options,
          disableMobile: true,
          dateFormat: dateFormats ? dateFormats : "D, M d, Y",
        }}
        onChange={(date) => {
          setFieldValue(name as string, dayjs(date[0]).valueOf());
          setTimeout(() => setFieldTouched?.(String(name), true));
        }}
        {...props}
      />
    </>
  );
}

export default Date;
