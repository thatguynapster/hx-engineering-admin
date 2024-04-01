"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormikHelpers } from "formik";
import queryString from "query-string";
import toast from "react-hot-toast";
import useSWR from "swr";

import AddProduct from "@/components/pages/inventory/add-product";
import TableBody from "@/components/pages/inventory/table-body";
import { TablePagination } from "@/components/Table";
import { createProductService } from "@/services";
import { IApiResponse, IProduct } from "@/types";
import { Button, Table } from "@/components";
import { FiltersProps } from "@/types/ui";
import { classNames } from "@/libs";
import { useStore } from "@/hooks";

const Products = () => {
  const router = useRouter();
  const { store } = useStore();
  const [filters, setFilters] = useState<Partial<FiltersProps>>({ page: 1 });

  const { data, isLoading, error, mutate } = useSWR<IApiResponse>(
    `/products?${queryString.stringify({ category_details: true, ...filters })}`
  );

  const uploadProduct = async (
    values: Partial<IProduct>,
    actions: FormikHelpers<Partial<IProduct>>,
    hide: () => void
  ) => {
    console.log(values);

    await createProductService(values, store.token!)
      .then((resp) => {
        console.log(resp);
        mutate();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        actions.setSubmitting(false);
        hide();
      });
  };

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
          "justify-between items-center",
          "flex flex-wrap",
          "w-full"
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
          <AddProduct onAdd={uploadProduct}>
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
                <TableBody key={key} data={product} />
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
