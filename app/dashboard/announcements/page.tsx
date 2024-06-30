"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

import { Table, TablePagination } from "@/components/Table";
import { Button } from "@/components/button";
import TableBody from "@/components/pages/announcements/table-body";
import { useAnnouncements } from "@/hooks";
import { classNames } from "@/libs";
import AddAnnouncement from "@/components/pages/announcements/add-announcement";
import { IAnnouncement } from "@/types";
import { FormikHelpers } from "formik";
import {
  createAnnouncementService,
  deleteAnnouncementService,
  updateAnnouncementService,
} from "@/services";

const AnnouncementsPage = () => {
  const [filters, setFilters] = useState<{ page?: number; limit?: number }>({});

  const { data, isLoading, error, mutate } = useAnnouncements(filters);

  const createAnnouncement = async (
    values: Partial<IAnnouncement>,
    actions: FormikHelpers<Partial<IAnnouncement>>,
    hide: () => void
  ) => {
    await createAnnouncementService(values)
      .then(() => {
        mutate();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        actions.setSubmitting(false);
        hide();
      });
  };

  const updateAnnouncement = async (
    id: string,
    values: Partial<IAnnouncement>,
    actions: FormikHelpers<Partial<IAnnouncement>>,
    hide: () => void
  ) => {
    await updateAnnouncementService(id, values)
      .then(() => {
        mutate();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        actions.setSubmitting(false);
        hide();
      });
  };

  const deleteAnnouncement = async ({
    id,
    setSubmitting,
    hide,
  }: {
    setSubmitting: (key: boolean) => void;
    id: string;
    hide: () => void;
  }) => {
    await deleteAnnouncementService(id)
      .then(() => {
        mutate();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setSubmitting(false);
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
        <h1 className="text-xl font-medium">Announcements</h1>
        <div
          className={classNames(
            "flex flex-wrap justify-end",
            "print:hidden",
            "gap-3"
          )}
        >
          <AddAnnouncement onAdd={createAnnouncement}>
            {({ proceed }) => (
              <Button onClick={proceed} className="bg-info text-white">
                <PlusIcon className="w-5 h-5/>" />
                <span className="hidden md:block">Create Announcement</span>
              </Button>
            )}
          </AddAnnouncement>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <Table.TH>title</Table.TH>
            <Table.TH>Date Created</Table.TH>
            <Table.TH></Table.TH>
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-20 dark:divide-neutral-50">
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
            <Table.Error field="Announcements" className="py-20" />
          )}

          {data && !error && (
            <>
              {/* empty */}
              {!data.docs.length && <Table.Empty field="orders" />}

              {data.docs.map((announcement, key) => (
                <TableBody
                  key={key}
                  data={announcement}
                  onEdit={(values, actions, hide) => {
                    updateAnnouncement(announcement._id, values, actions, hide);
                  }}
                  onDelete={deleteAnnouncement}
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

export default AnnouncementsPage;
