"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/libs";
import { ICategory } from "@/types";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export interface ISelectOption {
  label?: string;
  value?: any;
  [x: string]: any;
}

export interface SelectProps {
  placeholder?: string;
  options?: ISelectOption[];
  value: string | undefined;
  [x: string]: any;
}

export function Select({
  options = [],
  placeholder = "",
  value,
  onChange,
}: SelectProps) {
  const [selected, setSelected] = useState<ISelectOption>(
    options.find((option) => option.value === value)?.[0] ?? {
      label: placeholder,
      value: "",
    }
  );

  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        console.log(value);
        setSelected(value);
        onChange(value);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative w-full h-12">
            <Listbox.Button
              className={classNames(
                "relative w-full h-full cursor-default rounded-md  py-1.5 pl-4 pr-10 text-left",
                "bg-white dark:bg-neutral-gray"
              )}
            >
              <span className="block truncate">{selected.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={classNames(
                  "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                  "bg-white dark:bg-neutral-gray"
                )}
              >
                {options.map((opt) => (
                  <Listbox.Option
                    key={opt.value}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-info text-white"
                          : "text-gray-900 dark:text-neutral-30",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={opt}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {opt.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
