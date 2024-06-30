"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { ReactNode, TableHTMLAttributes } from "react";
import Tippy from "@tippyjs/react";

import { Button, Illustration } from "..";
import { classNames } from "@/libs";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  containerClassName?: string;
}

function Table({ children, containerClassName, ...props }: TableProps) {
  return (
    <div className="flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-neutral-20 dark:divide-neutral-50">
            {children}
          </table>
        </div>
      </div>
    </div>
  );
}

function TH({
  tooltip,
  className,
  children,
  ...props
}: {
  tooltip?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <th
      scope="col"
      className="py-4 px-3 text-left text-sm text-nowrap font-semibold"
    >
      <div
        className={classNames(
          "flex items-center gap-1",
          "text-sm text-neutral-40 font-medium capitalize",
          className
        )}
      >
        <span>{children}</span>
        {tooltip && (
          <Tippy
            arrow
            placement="top"
            trigger="mouseenter"
            animation="scale"
            className="shadow p-1 rounded-lg"
            content={<span>{tooltip}</span>}
          >
            <QuestionMarkCircleIcon
              className="h-4 w-4 text-neutral-30"
              aria-hidden="true"
            />
          </Tippy>
        )}
      </div>
    </th>
  );
}

function TD({
  children,
  className,
  ...props
}: TableHTMLAttributes<HTMLTableCellElement> & { rowSpan?: number }) {
  return (
    <td className={classNames("px-3 py-3.5 text-sm sm:table-cell")} {...props}>
      <div className={classNames("flex w-full", className)}>{children}</div>
    </td>
  );
}

function Error({
  field,
  title,
  subtext,
  className,
}: {
  field?: string;
  title?: string;
  subtext?: string;
  className?: string;
}) {
  return (
    <tr>
      <td colSpan={20}>
        <div
          className={classNames("flex flex-col gap-4 items-center", className)}
        >
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
      </td>
    </tr>
  );
}

function Empty({
  field,
  icon,
  title,
  subtext,
  className,
  action,
}: {
  field?: string;
  icon?: ReactNode;
  title?: string;
  subtext?: string;
  className?: string;
  action?: { text: string | ReactNode; onClick: () => void };
}) {
  return (
    <tr>
      <td colSpan={20}>
        <div
          className={`flex flex-col gap-8 px-4 w-full max-w-[370px] mx-auto ${className}`}
        >
          <div className="text-center flex flex-col gap-2">
            {icon ? icon : <Illustration.File className="mb-8 mx-auto" />}

            {/* <div> */}
            <p className="font-bold">{title ? title : "Nothing to see here"}</p>
            <p className="text-sm text-muted whitespace-pre-wrap">
              {subtext ? subtext : `No ${field} available.`}
            </p>
            {/* </div> */}
          </div>
          {action && (
            <Button
              type="button"
              className="btn btn-primary py-2 px-3"
              onClick={action.onClick}
            >
              {action.text}
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}

Table.Empty = Empty;
Table.Error = Error;
Table.TH = TH;
Table.TD = TD;

export { Table };
