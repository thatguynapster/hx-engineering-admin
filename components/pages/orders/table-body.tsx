"use client";

import { CheckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, useState } from "react";
import toast from "react-hot-toast";

import { updateSalesStatus } from "@/services";
import { Button, Dropdown, Table } from "@/components";
import { classNames } from "@/libs";
import { ISales } from "@/types";
import dayjs from "dayjs";
import { Spinner } from "@/components/icons";

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
          <div className="py-2 px-4 rounded-md border border-neutral-30 dark:border-neutral-10">
            {isSubmitting ? (
              <Spinner />
            ) : (
              <ShieldCheckIcon className="w-6 h-6" />
            )}
          </div>
        );
      case "COMPLETED":
        return (
          <div>
            <ShieldCheckIcon className="w-6 h-6" />
          </div>
        );
      default:
        return (
          <div className="py-2 px-4 rounded-md border border-neutral-30 dark:border-neutral-10">
            {isSubmitting ? <Spinner /> : <CheckIcon className="w-6 h-6" />}
          </div>
        );
    }
  };

  return (
    <tr className="dark:text-neutral-10 hover:bg-neutral-10 dark:hover:bg-neutral-dark my-2">
      <Table.TD className="sticky left-0">
        <span className="whitespace-nowrap">#{data.code}</span>
      </Table.TD>

      <Table.TD>
        <div className="flex flex-col gap-0.5">
          <span className="whitespace-nowrap">{data.user?.name}</span>
          <span className="whitespace-nowrap">{data.user?.phone}</span>
        </div>
      </Table.TD>

      <Table.TD className="min-w-56 max-w-80 w-full">
        {data.products.map((product) => product.details?.name).join(", ")}
      </Table.TD>

      <Table.TD className="flex justify-end">
        &#8373;{data.price.toFixed(2)}
      </Table.TD>

      <Table.TD className="flex justify-center">
        <span className="whitespace-nowrap">
          {data.products.reduce((acc, prod) => acc + prod.quantity, 0)}
        </span>
      </Table.TD>

      <Table.TD className="flex justify-center">
        <div className="flex flex-col gap-0.5">
          <span className="whitespace-nowrap">
            {dayjs(data.createdAt).format("DD/MM/YYYY")}
          </span>
          <span className="whitespace-nowrap">
            {dayjs(data.createdAt).format("hh:mma")}
          </span>
        </div>
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
        <Dropdown>
          <Dropdown.Toggle
            disabled={data.status === "COMPLETED"}
            className={classNames(
              "flex",
              "items-center justify-center",
              "w-full"
            )}
          >
            {statusActionButton()}
          </Dropdown.Toggle>

          <Dropdown.Menu className="divide-y divide-neutral-200">
            {/* pending */}
            {["PENDING"].includes(data.status) && (
              <ActionButton
                text="Set to Ready"
                icon={<CheckIcon className="w-6 h-6" />}
                onClick={() => {
                  markAsReady("READY_FOR_DELIVERY");
                }}
              />
            )}

            {/* ready for delivery */}
            {["READY_FOR_DELIVERY"].includes(data.status) && (
              <>
                <ActionButton
                  text="Set to Pending"
                  icon={<CheckIcon className="w-6 h-6" />}
                  onClick={() => {
                    markAsReady("PENDING");
                  }}
                />

                <ActionButton
                  text="Set to Completed"
                  icon={<ShieldCheckIcon className="w-6 h-6" />}
                  onClick={() => {
                    markAsReady("COMPLETED");
                  }}
                />
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>

        {/* {statusActionButton()} */}
      </Table.TD>
    </tr>
  );
};

const ActionButton = ({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon?: ReactNode;
  onClick: () => void;
}) => {
  return (
    <Dropdown.Item
      onClick={onClick}
      className={classNames("py-2.5 px-4 w-full", "gap-4")}
    >
      {icon && icon}
      <p className="text-sm">{text}</p>
    </Dropdown.Item>
  );
};

export default TableBody;
