import { PlusIcon } from "@heroicons/react/24/solid";
import { startCase } from "lodash";
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import { Badge, Field, Table } from "@/components";
import { classNames } from "@/libs";
import { IProduct } from "@/types";

const TableBody = ({
  data,
  onMutate,
}: {
  data: IProduct;
  onMutate: () => void;
}) => {
  return (
    <tr className="dark:text-neutral-10 cursor-pointer hover:bg-neutral-50 my-2">
      <Table.TD>
        <div
          className={classNames(
            "text-sm",
            "flex flex-row items-center",
            "gap-4 truncate",
            "w-max"
          )}
        >
          <div className="w-[60px] h-[70px] bg-white bg-center bg-no-repeat bg-cover">
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
        <span className="whitespace-nowrap">&#8373;{data.cost_price}</span>
      </Table.TD>

      <Table.TD className="flex justify-end">
        <span className="whitespace-nowrap">&#8373;{data.sale_price}</span>
      </Table.TD>

      <Table.TD className="flex justify-center">
        <span className="whitespace-nowrap">{data.quantity}</span>
      </Table.TD>

      <Table.TD className="flex justify-center">
        <span className="whitespace-nowrap truncate">{data.category}</span>
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
