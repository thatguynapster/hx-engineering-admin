"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

import { Button, Dropdown, Table } from "@/components";
import { classNames } from "@/libs";
import { IAnnouncement, IProduct } from "@/types";
import { routes } from "@/routes";
import dayjs from "dayjs";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import AddAnnouncement from "./add-announcement";
import { FormikHelpers } from "formik";
import {
  createAnnouncementService,
  updateAnnouncementService,
} from "@/services";
import DeleteAnnouncement from "./delete-announcement";

const TableBody = ({
  data: announcement,
  onDelete,
  onEdit,
}: {
  data: IAnnouncement;
  //   onDelete: (id: string, hide: () => void) => void;
  onDelete: (props: {
    setSubmitting: (key: boolean) => void;
    id: string;
    hide: () => void;
  }) => void;
  onEdit: (
    values: Partial<IAnnouncement>,
    actions: FormikHelpers<Partial<IAnnouncement>>,
    hide: () => void
  ) => void;
}) => {
  return (
    <tr className="dark:text-neutral-10 cursor-pointer hover:bg-neutral-10 dark:hover:bg-neutral-dark my-2">
      <Table.TD>{announcement.title}</Table.TD>
      <Table.TD>
        {dayjs(announcement.createdAt).format("DD MMM, YYYY")}
      </Table.TD>
      <Table.TD className="justify-end">
        {/* <div className="flex items-end">
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </div> */}
        <Dropdown>
          <Dropdown.Toggle className="flex items-center justify-center">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="min-w-40 divide-y divide-neutral-200">
            <AddAnnouncement announcementID={announcement._id} onAdd={onEdit}>
              {({ proceed }) => (
                <Dropdown.Item
                  onClick={proceed}
                  className={classNames("py-2.5 px-4", "gap-4")}
                >
                  <PencilIcon className="w-5 h-5" />
                  <p className="text-sm">Edit</p>
                </Dropdown.Item>
              )}
            </AddAnnouncement>
            <DeleteAnnouncement {...{ announcement, onDelete }}>
              {({ proceed }) => (
                <Dropdown.Item
                  onClick={proceed}
                  className={classNames(
                    "py-2.5 px-4",
                    "gap-4",
                    "hover:!bg-error/10 !text-error"
                  )}
                >
                  <TrashIcon className="w-5 h-5" />
                  <p className="text-sm">Delete</p>
                </Dropdown.Item>
              )}
            </DeleteAnnouncement>
          </Dropdown.Menu>
        </Dropdown>
      </Table.TD>
    </tr>
  );
};

export default TableBody;
