import React from "react";

import { classNames } from "@/libs";
import { Button, Icons } from ".";
import Dropdown from "./Dropdown";
import Link from "next/link";
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  PowerIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const Navbar = ({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: (t: boolean) => void;
}) => {
  return (
    <div
      className={classNames(
        "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8",
        "border-b border-neutral-20 dark:border-none",
        "bg-white dark:bg-neutral-gray"
      )}
    >
      <button
        type="button"
        className="-m-2.5 p-2.5 dark:text-neutral-10 lg:hidden"
        onClick={() => setToggle(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 justify-end gap-x-4 lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div
            className={classNames(
              "w-10 h-10",
              "bg-error/10 dark:bg-error",
              "text-error dark:text-white",
              "flex items-center justify-center rounded-full"
            )}
          >
            <PowerIcon className="w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
