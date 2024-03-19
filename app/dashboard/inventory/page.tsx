"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import queryString from "query-string";

import TableBody from "@/components/pages/inventory/table-body";
import { TablePagination } from "@/components/Table";
import { Button, Table } from "@/components";
import { FiltersProps } from "@/types/ui";
import { classNames, http } from "@/libs";
import { IApiResponse } from "@/types";
import { useStore } from "@/hooks";
import { useRouter } from "next/navigation";
import AddProduct from "@/components/pages/inventory/add-product";

const Products = () => {
  const router = useRouter();
  const { store } = useStore();
  const [filters, setFilters] = useState<Partial<FiltersProps>>({});

  const { data, isLoading, error, mutate } = useSWR<IApiResponse>(
    store && `/products?${queryString.stringify({ ...filters })}`,
    (key: string) =>
      http.get<never, any>(key, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      })
  );

  return (
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
          "flex flex-wrap w-full justify-between items-center"
          // "divide-neutral-200 divide-y"
        )}
      >
        <h1 className="text-xl font-medium">Products</h1>
        <div
          className={classNames(
            "flex flex-wrap justify-end",
            "print:hidden",
            "gap-3"
          )}
        >
          <AddProduct
            onAdd={function (): void {
              toast.error("Function not implemented.");
            }}
          >
            {({ proceed }) => (
              <Button className="bg-info text-white" onClick={proceed}>
                <PlusIcon className="w-5 h-5/>" />
                <span className="hidden lg:block">Add Product</span>
              </Button>
            )}
          </AddProduct>
          {/* <Button
            className={classNames(
              "bg-white dark:bg-transparent",
              "text-neutral-50 dark:text-neutral-10",
              "border border-neutral-30 dark:border-neutral-10"
            )}
            onClick={() => {}}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            <span className="hidden lg:block">Filters</span>
          </Button> */}
          {/* <Button
            className={classNames(
              "bg-white dark:bg-transparent",
              "text-neutral-50 dark:text-neutral-10",
              "border border-neutral-30 dark:border-neutral-10"
            )}
            onClick={() => {}}
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span className="hidden lg:block">Download all</span>
          </Button> */}
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <Table.TH>products</Table.TH>
            <Table.TH className="flex justify-end">cost</Table.TH>
            <Table.TH className="flex justify-end">sale price</Table.TH>
            <Table.TH className="flex justify-center">quantity</Table.TH>
            <Table.TH className="flex justify-center">category</Table.TH>
            <Table.TH className="flex justify-center"> availability</Table.TH>
          </tr>
        </thead>
        {/* <tbody className="flex flex-col gap-2"> */}
        <tbody className="divide-y divide-neutral-50">
          {/* loading state */}
          {isLoading && (
            <>
              {Array.from({ length: 10 }, (_, i) => (
                <tr className="animate-pulse" key={i}>
                  {Array.from({ length: 6 }, (_, i) => (
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
            <Table.Error field="inventory" className="py-20" />
          )}

          {data && !error && (
            <>
              {/* empty */}
              {!data.docs.length && <Table.Empty field="orders" />}

              {data.docs.map((product, key) => (
                <TableBody
                  key={key}
                  data={product}
                  onMutate={function (): void {
                    toast.error("Function not implemented.");
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
            setPage={(page) => setFilters((filters) => ({ ...filters, page }))}
          />
        </div>
      )}
    </div>
  );
};

export default Products;