"use client";

import { Button, Table, TablePagination } from "@/components";
import AddCategory from "@/components/pages/inventory/categories/add-category";
import CategoryCard from "@/components/pages/inventory/categories/category-card";
import { useCategories } from "@/hooks";
import { classNames } from "@/libs";
import { createCategoryService } from "@/services/category";
import { ICategory } from "@/types";
import { FiltersProps } from "@/types/ui";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FormikHelpers } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Categories = () => {
  const [filters, setFilters] = useState<Partial<FiltersProps>>({
    page: 1,
    limit: 12,
  });
  const { data, isLoading, error, mutate } = useCategories(filters);
  console.log(data);

  const addCategory = async (values: Partial<ICategory>, hide: () => void) => {
    await createCategoryService(values)
      .then(() => {
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to add category");
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <div
      className={classNames(
        "bg-white dark:bg-neutral-gray",
        "rounded-lg shadow-sm",
        "flex flex-col",
        "gap-6 p-4",
        "w-full"
      )}
    >
      <div
        className={classNames(
          "justify-between items-center",
          "flex flex-wrap gap-4",
          "w-full"
        )}
      >
        <h1 className="text-xl font-medium">Categories</h1>
        <div
          className={classNames(
            "flex flex-wrap justify-end",
            "print:hidden",
            "gap-3"
          )}
        >
          <AddCategory onAdd={addCategory}>
            {({ proceed }) => (
              <Button
                onClick={proceed}
                className={classNames(
                  "border border-neutral-30 dark:border-neutral-10",
                  "text-neutral-50 dark:text-neutral-10",
                  "bg-white dark:bg-transparent"
                )}
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add Category</span>
              </Button>
            )}
          </AddCategory>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading && (
          <>
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="animate-pulse p-4 bg-neutral-20 shadow-md dark:bg-neutral-dark rounded-lg h-40"
              />
            ))}
          </>
        )}

        {data?.docs.map(({ name, description, _id }, i) => (
          <CategoryCard
            key={i}
            data={{ name, description, _id }}
            {...{ mutate }}
          />
        ))}
      </div>

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

export default Categories;
