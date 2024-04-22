"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import queryString from "query-string";
import useSWR, { useSWRConfig } from "swr";

import { IApiResponse } from "@/types";
import { Button, Table, TablePagination } from "@/components";
import { FiltersProps } from "@/types/ui";
import { classNames } from "@/libs";
import { useStore } from "@/hooks";
import TableBody from "@/components/pages/orders/table-body";

const Orders = () => {
  const [filters, setFilters] = useState<Partial<FiltersProps>>({ page: 1 });

  const { data, isLoading, error, mutate } = useSWR<IApiResponse>(
    `/sales?${queryString.stringify({ product_details: true, ...filters })}`
  );

  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
    mutate: summaryMutate,
  } = useSWR(`/sales/summary?${queryString.stringify({ ...filters })}`);

  return (
    <div className="flex flex-col gap-6">
      <div
        className={classNames(
          "flex flex-col",
          "gap-6 p-4",
          "rounded-lg shadow-sm",
          "w-full",
          "bg-white dark:bg-neutral-gray"
        )}
      >
        <div
          className={classNames(
            "justify-between items-center",
            "flex flex-wrap",
            "w-full"
          )}
        >
          <h1 className="text-xl font-medium">Summary</h1>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 divide-x">
          {summaryLoading && <></>}
          {summaryData &&
            Object.keys(summaryData).map((key, i) => (
              <div
                key={i}
                className={classNames(
                  i === Object.keys(summaryData).length - 1
                    ? "pl-4 md:pl-8"
                    : i == 0
                    ? "pr-4 md:pr-8"
                    : "px-4 md:px-8"
                )}
              >
                <div className={classNames("flex flex-col gap-3")}>
                  <h1
                    className={classNames(
                      "font-semibold capitalize truncate",
                      key.split("_")[0] === "total" && "text-info",
                      key.split("_")[0] === "completed" && "text-success",
                      key.split("_")[0] === "pending" && "text-neutral-40"
                    )}
                  >
                    {key.split("_").join(" ")}
                  </h1>

                  <div className="flex flex-col md:flex-row gap-3 justify-between">
                    <div className="flex flex-col md:gap-3">
                      <p className="font-semibold">{summaryData[key].count}</p>
                      <p className="font-semibold text-xs text-neutral-30">
                        Last 7 days
                      </p>
                    </div>

                    <div className="flex flex-col md:gap-3 md:items-end">
                      <p className="font-semibold">
                        &#8373;
                        {(
                          summaryData[key].amount.toFixed(2) as number
                        ).toLocaleString()}
                      </p>
                      <p className="font-semibold text-xs text-neutral-30 md:text-left">
                        Revenue
                      </p>
                    </div>
                  </div>
                  {/* 
                  <div className="flex justify-between">
                    <p className="font-semibold">{summaryData[key].count}</p>
                    <p className="font-semibold">
                      &#8373;
                      {(
                        summaryData[key].amount.toFixed(2) as number
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm text-neutral-30">
                      Last 7 days
                    </p>
                    <p className="font-semibold text-sm text-neutral-30">
                      Revenue
                    </p>
                  </div> */}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={classNames(
          "flex flex-col",
          "gap-6 p-4",
          "rounded-lg shadow-sm",
          "w-full",
          "bg-white dark:bg-neutral-gray"
        )}
      >
        <div
          className={classNames(
            "justify-between items-center",
            "flex flex-wrap",
            "w-full"
          )}
        >
          <h1 className="text-xl font-medium">Orders</h1>
          {/* <div
            className={classNames(
              "flex flex-wrap justify-end",
              "print:hidden",
              "gap-3"
            )}
          >
            <Button className="bg-info text-white">
              <PlusIcon className="w-5 h-5/>" />
              <span className="hidden lg:block">Add Order</span>
            </Button>
          </div> */}
        </div>

        <Table>
          <thead>
            <tr>
              <Table.TH>Order ID</Table.TH>
              <Table.TH className="">Customer</Table.TH>
              <Table.TH className="">Products</Table.TH>
              <Table.TH className="flex justify-center">order value</Table.TH>
              <Table.TH className="flex justify-center">quantity</Table.TH>
              {/* <Table.TH className="flex justify-center">
              expected delivery
            </Table.TH> */}
              <Table.TH className="">status</Table.TH>
              <Table.TH className=""></Table.TH>
            </tr>
          </thead>
          {/* <tbody className="flex flex-col gap-2"> */}
          <tbody className="divide-y divide-neutral-20 dark:divide-neutral-50">
            {/* loading state */}
            {isLoading && (
              <>
                {Array.from({ length: 10 }, (_, i) => (
                  <tr className="animate-pulse" key={i}>
                    {Array.from({ length: 7 }, (_, i) => (
                      <Table.TD key={i}>
                        <div className="w-full h-3 flex-[0_0_85%] rounded-sm bg-neutral-200" />
                      </Table.TD>
                    ))}
                  </tr>
                ))}
              </>
            )}

            {/* error */}
            {error && !isLoading && (
              <Table.Error field="orders" className="py-20" />
            )}

            {data && !error && (
              <>
                {/* empty */}
                {!data.docs.length && <Table.Empty field="orders" />}

                {data.docs.map((sale, key) => (
                  <TableBody
                    key={key}
                    data={sale}
                    mutate={() => {
                      mutate();
                      summaryMutate();
                    }}
                  />
                ))}
              </>
            )}
          </tbody>
        </Table>
        {data && (
          <div className="flex w-full">
            <TablePagination
              page={data.page}
              pages={data.totalPages}
              hasNext={data.hasNextPage}
              hasPrev={data.hasPrevPage}
              setPage={(page) =>
                setFilters((filters) => ({ ...filters, page }))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
