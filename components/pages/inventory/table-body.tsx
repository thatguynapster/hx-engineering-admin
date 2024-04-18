"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

import { Table } from "@/components";
import { classNames } from "@/libs";
import { IProduct } from "@/types";
import { routes } from "@/routes";

const TableBody = ({ data }: { data: IProduct }) => {
  const router = useRouter();
  return (
    <tr
      className="dark:text-neutral-10 cursor-pointer hover:bg-neutral-10 dark:hover:bg-neutral-dark my-2"
      onClick={() => {
        router.push(
          routes.inventory.details
            .replace(":product_id", data._id)
            .replace(":tab", "overview")
        );
      }}
    >
      <Table.TD>
        <div
          className={classNames(
            "text-sm",
            "flex flex-row items-center",
            "gap-4 truncate",
            "w-max"
          )}
        >
          <div className="w-[60px] h-[70px] bg-center bg-no-repeat bg-cover rounded-md">
            <Image
              width={60}
              height={70}
              src={(data.images[0] as string) ?? "/img/logo.png"}
              alt={`${name} image`}
              className={`w-full h-full rounded-md`}
              onError={(ev) => {
                ev.currentTarget.src = "/img/logo.png";
              }}
            />
          </div>
          <p className="whitespace-nowrap truncate">{data.name}</p>
        </div>
      </Table.TD>

      <Table.TD className="flex justify-end">
        <span className="whitespace-nowrap">
          &#8373;{data.cost_price.toFixed(2)}
        </span>
      </Table.TD>

      <Table.TD className="flex justify-end">
        <span className="whitespace-nowrap">
          &#8373;{data.sale_price.toFixed(2)}
        </span>
      </Table.TD>

      <Table.TD className="flex justify-center">
        <span className="whitespace-nowrap">{data.quantity}</span>
      </Table.TD>

      <Table.TD className="flex justify-center">
        <span className="whitespace-nowrap truncate">
          {data.category_details?.name ?? "n/a"}
        </span>
      </Table.TD>

      <Table.TD
        className="flex justify-center"
        // onClick={proceed}
      >
        <div className="w-[100px]">
          {/* <Badge variant={data.quantity > 0 ? "success" : "danger"}>
            {data.quantity > 0 ? "In-stock" : "Out of stock"}
          </Badge> */}
          <div
            className={classNames(
              data.quantity > 0 ? "text-success" : "text-error",
              "font-medium"
            )}
          >
            {data.quantity > 0 ? "In-stock" : "Out of stock"}
          </div>
        </div>
      </Table.TD>
    </tr>
  );
};

export default TableBody;
