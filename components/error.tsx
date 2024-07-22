import { classNames } from "@/libs";
import React from "react";
import { Illustration } from ".";

type Props = {
  className?: string;
  field: string;
  subtext?: string;
  title?: string;
};

const Error = ({ className, field, subtext, title }: Props) => {
  return (
    <div className={classNames("flex flex-col gap-4 items-center", className)}>
      <div
        className={classNames(
          "w-24 h-24",
          "p-4 rounded-full",
          "bg-neutral-10 dark:bg-error"
        )}
      >
        <Illustration.Warning className="w-auto text-error dark:text-neutral-10" />
      </div>

      <div className="flex flex-col max-w-[360px] w-full text-center">
        <p className="font-bold">{title ?? "Something went wrong"}</p>

        <p className="text-sm text-neutral-40 dark:text-neutral-30 whitespace-normal">
          {subtext ??
            `Faile to load your ${field}. Check your network connection and try again`}
        </p>
      </div>
    </div>
  );
};

export default Error;
