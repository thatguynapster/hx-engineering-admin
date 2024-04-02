import { classNames } from "@/libs";
import { IProduct } from "@/types";
import Image from "next/image";
import React from "react";

const ProductOverview = ({ data }: { data: IProduct }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex flex-col gap-4 w-full">
          <h3 className={classNames("font-semibold", "dark:text-neutral-50")}>
            Details
          </h3>
          <div className="flex w-full items-center">
            <div className="flex flex-col gap-6 w-1/2">
              <p>
                <span>Name</span>
              </p>
              <p>
                <span>Category</span>
              </p>
              <p>
                <span>Quantity</span>
              </p>
              <p>
                <span>Cost</span>
              </p>
              <p>
                <span>Sale Price</span>
              </p>
            </div>

            <div className="flex flex-col gap-6 w-1/3">
              <p className="truncate">{data.name}</p>
              <p className="truncate">{data.category_details?.name ?? "n/a"}</p>
              <p className="truncate">{data.quantity}</p>
              <p className="truncate">&#8373;{data.cost_price.toFixed(2)}</p>
              <p className="truncate">&#8373;{data.sale_price.toFixed(2)}</p>
            </div>

            <div className="w-[170px] h-[170px] bg-center bg-no-repeat bg-cover rounded-2xl border-2 border-dashed border-neutral-40">
              <Image
                width={170}
                height={170}
                src={(data.images[0] as string) ?? "/img/logo.png"}
                alt={`${name} image`}
                className={`w-full h-full rounded-2xl`}
                onError={(ev) => {
                  ev.currentTarget.src = "/img/logo.png";
                }}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex flex-col gap-4 w-full">
          <h3 className={classNames("font-semibold", "dark:text-neutral-50")}>
            Details
          </h3>
          <div className="flex w-full mb-4">
            <p dangerouslySetInnerHTML={{ __html: data.details }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
