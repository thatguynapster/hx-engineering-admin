"use client";

import { FormikHelpers } from "formik";
import React, { useState } from "react";
import useSWR from "swr";

import AddProduct from "@/components/pages/inventory/add-product";
import { ChevronLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Button, Tabs } from "@/components";
import { classNames } from "@/libs";
import { IProduct } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { routes } from "@/routes";
import ProductOverview from "@/components/pages/inventory/product-details";
import { useProduct } from "@/hooks";
import { updateProductService } from "@/services";

const ProductDetails = ({
  params,
}: {
  params: { productID: string; tab: string };
}) => {
  const router = useRouter();

  const { productID, tab } = params;
  const [activeKey, setActiveKey] = useState<string>(tab);

  const { data, isLoading, mutate, error } = useProduct(productID, {
    category_details: true,
  });

  const updateProduct = async (
    values: Partial<IProduct>,
    actions: FormikHelpers<Partial<IProduct>>,
    hide: () => void
  ) => {
    await updateProductService(productID, values)
      .then((resp) => {
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
        "gap-4 p-4",
        "rounded-lg shadow-sm",
        "w-full",
        "bg-white dark:bg-neutral-gray"
      )}
    >
      <div className="md:flex md:items-center md:justify-between">
        {isLoading && (
          <>
            <div className="w-40 h-[38px] bg-neutral-50 animate-pulse rounded-lg" />
            <div className="w-20 h-[38px] bg-neutral-50 animate-pulse rounded-lg" />
          </>
        )}

        {data && (
          <>
            <div className="flex gap-4 items-center">
              <div className="flex">
                <Button
                  type="button"
                  className="flex gap-1 items-center rounded-md text-sm font-medium border border-neutral-30 dark:border-neutral-10"
                  disabled={!!error}
                  onClick={() => {
                    router.push(routes.inventory.index);
                  }}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </Button>
              </div>
              <h3 className="text-base font-semibold leading-6">{data.name}</h3>
            </div>

            <div className="flex">
              <AddProduct onAdd={updateProduct} {...{ productID }}>
                {({ proceed }) => (
                  <Button
                    type="button"
                    className="flex gap-1 items-center rounded-md text-sm font-medium border border-neutral-30 dark:border-neutral-10"
                    disabled={!!error}
                    onClick={proceed}
                  >
                    <PencilIcon className="w-5 h-5" />
                    Edit
                  </Button>
                )}
              </AddProduct>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <Tabs
          {...{ activeKey }}
          {...{ tabs }}
          onSelect={(key) => {
            setActiveKey(key);
            router.push(
              routes.inventory.details
                .replace(":product_id", productID)
                .replace(":tab", key)
            );
          }}
        />

        <div className="flex flex-col gap-6">
          {tab === "overview" && (
            <>
              {isLoading && <>Loading...</>}
              {error && !isLoading && <>error</>}
              {data && <ProductOverview {...{ data }} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

const tabs = [
  { name: "Overview", slug: "overview" },
  // { name: "Purchases", slug: "purchases" },
];
