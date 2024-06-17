import { Bars3Icon, PowerIcon } from "@heroicons/react/24/outline";
import React from "react";

import { classNames } from "@/libs";
import { useStore } from "@/hooks";

export const Navbar = ({ setToggle }: { setToggle: (t: boolean) => void }) => {
  const { store } = useStore();

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
              "flex items-center justify-center",
              "text-error dark:text-white",
              "bg-error/10 dark:bg-error",
              "cursor-pointer",
              "rounded-full",
              "w-10 h-10"
            )}
            // @ts-ignore This is valid. Figure out why it's throwing an error
            onClick={() => store.logout()}
          >
            <PowerIcon className="w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
