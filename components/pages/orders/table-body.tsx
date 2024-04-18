"use client";

import { CheckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { updateSalesStatus } from "@/services";
import { Button, Table } from "@/components";
import { classNames } from "@/libs";
import { ISales } from "@/types";

const TableBody = ({ data, mutate }: { data: ISales; mutate: () => void }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const markAsReady = async (status: ISales["status"]) => {
    try {
      setIsSubmitting(true);
      await updateSalesStatus(String(data._id), { status });
      mutate();
      toast.success("Sale status updated");
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to change status");
    }
  };

  const statusActionButton = () => {
    switch (data.status) {
      case "READY_FOR_DELIVERY":
        return (
          <Button
            className="border border-neutral-30 dark:border-neutral-10"
            onClick={() => markAsReady("COMPLETED")}
            {...{ isSubmitting }}
          >
            {!isSubmitting && <ShieldCheckIcon className="w-6 h-6" />}
          </Button>
        );
      case "COMPLETED":
        return (
          <Button
            onClick={() => markAsReady("READY_FOR_DELIVERY")}
            disabled={true}
          >
            {!isSubmitting && <ShieldCheckIcon className="w-6 h-6" />}
          </Button>
        );
      default:
        return (
          <Button
            className="border border-neutral-30 dark:border-neutral-10"
            onClick={() => markAsReady("READY_FOR_DELIVERY")}
            {...{ isSubmitting }}
          >
            {!isSubmitting && <CheckIcon className="w-6 h-6" />}
          </Button>
        );
    }
  };

  return (
    <tr className="dark:text-neutral-10 hover:bg-neutral-10 dark:hover:bg-neutral-dark my-2">
      <Table.TD className="sticky left-0">
        <span className="whitespace-nowrap">#{data.code}</span>
      </Table.TD>

      <Table.TD>
        <div className="flex flex-col gap-2">
          <span className="whitespace-nowrap">{data.user?.name}</span>
          <span className="whitespace-nowrap">{data.user?.phone}</span>
        </div>
      </Table.TD>

      <Table.TD>
        <span className="whitespace-nowrap truncate">
          {data.products.map((product) => product.details?.name).join(", ")}
        </span>
      </Table.TD>

      <Table.TD className="flex justify-end">
        <span className="whitespace-nowrap truncate">
          &#8373;{data.price.toFixed(2)}
        </span>
      </Table.TD>

      <Table.TD className="flex justify-center">
        <span className="whitespace-nowrap">
          {data.products.reduce((acc, prod) => acc + prod.quantity, 0)}
        </span>
      </Table.TD>

      <Table.TD className="flex justify-center">
        <span
          className={classNames(
            "whitespace-nowrap truncate capitalize font-semibold",
            data.status === "READY_FOR_DELIVERY" && "text-warning",
            data.status === "COMPLETED" && "text-success"
          )}
        >
          {data.status?.split("_").join(" ").toLowerCase() ?? ""}
        </span>
      </Table.TD>
      <Table.TD className="flex justify-center">
        {statusActionButton()}
      </Table.TD>
    </tr>
  );
};

export default TableBody;
