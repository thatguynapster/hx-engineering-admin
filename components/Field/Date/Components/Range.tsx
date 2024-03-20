"use client";

import { ReactNode, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import dayjs from "dayjs";

import { StyledCalendar, RightArrow, LeftArrow } from "./Styles";
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
  const predefinedDates = [
    {
      label: "Today",
      value: [dayjs().startOf("day"), dayjs().endOf("day")],
    },
    {
      label: "Yesterday",
      value: [
        dayjs().subtract(1, "day").startOf("day"),
        dayjs().subtract(1, "day").endOf("day"),
      ],
    },
    {
      label: "This week",
      value: [dayjs().startOf("week"), dayjs().endOf("day")],
    },
    {
      label: "Last week",
      value: [
        dayjs().subtract(7, "days").startOf("week"),
        dayjs().subtract(7, "days").endOf("week"),
      ],
    },
    {
      label: "This month",
      value: [dayjs().startOf("month"), dayjs().endOf("day")],
    },
    {
      label: "Last month",
      value: [
        dayjs().subtract(1, "month").startOf("month"),
        dayjs().subtract(1, "month").endOf("month"),
      ],
    },
    {
      label: "This year",
      value: [dayjs().startOf("year"), dayjs().endOf("day")],
    },
    {
      label: "Last year",
      value: [
        dayjs().subtract(1, "year").startOf("year"),
        dayjs().subtract(1, "year").endOf("year"),
      ],
    },
  ];

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
      <Dropdown.Menu>
        <div
          className={classNames(
            "md:divide-x md:divide-neutral-200",
            "grid grid-cols-1 md:grid-cols-[120px_312px]"
          )}
        >
          <div className="px-2 py-4">
            {predefinedDates.map(({ label, value }, key) => (
              <button
                key={key}
                className="px-4 py-2.5 font-medium text-sm"
                onClick={() => {
                  setPeriod(label);
                  onChange(
                    value.map((i) => i.valueOf()),
                    label
                  );
                }}
              >
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="flex md:flex-row">
            <div className="divide-y divide-neutral-200">
              <StyledCalendar className="p-4">
                <Flatpickr
                  value={dates}
                  options={{
                    mode: "range",
                    inline: true,
                    nextArrow: RightArrow,
                    prevArrow: LeftArrow,
                    // maxDate: dayjs().toDate(),
                  }}
                  onChange={(values: Date[]) => {
                    setDates(values.map((i) => dayjs(i).valueOf()));
                  }}
                  render={(props, ref) => <div ref={ref} />}
                />
              </StyledCalendar>
              <div className="p-4 grid grid-cols-2 gap-2">
                <Button
                  className="btn-outline"
                  onClick={() => setToggle(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!active}
                  className="btn btn-primary"
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
