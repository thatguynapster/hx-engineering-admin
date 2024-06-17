import { classNames } from "@/libs";
import React from "react";
import { Button } from "..";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface PaginateProps {
  page: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  setPage: (key: number) => void;
  className?: string;
}

export const TablePagination = ({
  page,
  pages,
  hasNext,
  hasPrev,
  setPage,
  className,
}: PaginateProps) => {
  return (
    <div
      className={classNames(
        "justify-between items-center",
        "flex gap-6",
        "w-full",
        className
      )}
    >
      <Button
        className={classNames(
          "bg-white dark:bg-transparent",
          "text-neutral-50 dark:text-neutral-10",
          "border border-neutral-30 dark:border-neutral-10"
        )}
        disabled={!hasPrev}
        aria-label="Previous page"
        onClick={() => setPage(page - (1 % page))}
      >
        Previous
      </Button>

      <small className="text-sm">
        Page {page} of {pages}{" "}
      </small>

      <Button
        className={classNames(
          "bg-white dark:bg-transparent",
          "text-neutral-50 dark:text-neutral-10",
          "border border-neutral-30 dark:border-neutral-10"
        )}
        aria-label="Next page"
        disabled={!hasNext}
        onClick={() => setPage(1 + (page % pages))}
      >
        Next
      </Button>
    </div>
  );
};
