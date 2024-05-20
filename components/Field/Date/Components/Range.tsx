import { ReactNode, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import dayjs from "dayjs";

import { LeftArrow, RightArrow, StyledCalendar } from "./Styles";
import { Button, Dropdown } from "@/components";
import { classNames } from "@/libs";

export interface RangeProps {
  values?: number[];
  className?: string;
  onChange: (values: number[], period?: string) => void;
  children: ReactNode;
}

export function Range({ values, onChange, className, children }: RangeProps) {
  /**
   * states
   */
  const [dates, setDates] = useState<number[]>(() => values || []);
  const [period, setPeriod] = useState<string>();
  const [toggle, setToggle] = useState(false);

  /**
   * variables
   */
  const active = dates?.length === 2;

  /**
   * effect
   */
  useEffect(() => {
    if (values?.length === 2) {
      setDates(values);
    }
  }, [values]);

  return (
    <Dropdown
      show={toggle}
      onToggle={setToggle}
      className={classNames(className)}
    >
      <Dropdown.Toggle as="div">
        <div>{children}</div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dark:!bg-neutral-dark max-w-xs">
        <div
          className={classNames(
            "md:divide-x md:divide-neutral-10 dark:divide-neutral-50",
            "flex flex-col lg:flex-row"
          )}
        >
          <div className="flex md:flex-row w-">
            <div className="divide-y divide-neutral-10 dark:divide-neutral-50 w-full">
              <StyledCalendar className="p-4">
                <Flatpickr
                  value={dates}
                  options={{
                    mode: "range",
                    inline: true,
                    nextArrow: RightArrow,
                    prevArrow: LeftArrow,
                  }}
                  onChange={(values: Date[]) => {
                    setPeriod("Custom period");
                    setDates(values.map((i) => dayjs(i).valueOf()));
                  }}
                  render={(props, ref) => <div ref={ref} />}
                />
              </StyledCalendar>

              <div className="p-4 grid grid-cols-2 gap-2">
                <Button
                  className="btn-primary"
                  onClick={() => setToggle(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!active}
                  className="btn-primary"
                  onClick={() => {
                    if (active) {
                      onChange(dates, period);
                      setToggle(false);
                    }
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Range;
