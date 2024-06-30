import React, { ReactNode, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { object } from "yup";

import useAnnouncement from "@/hooks/useAnnouncement";
import { Button, Field, Modal } from "@/components";
import { classNames, schema } from "@/libs";
import { IAnnouncement } from "@/types";
import { useStore } from "@/hooks";

interface DeleteAnnouncementProps {
  announcement: IAnnouncement;
  children: (props: {
    proceed: () => void;
    isSubmitting: boolean;
  }) => ReactNode;
  onDelete: (props: {
    setSubmitting: (key: boolean) => void;
    id: string;
    hide: () => void;
  }) => void;
}

const DeleteAnnouncement = ({
  announcement,
  children,
  onDelete,
}: DeleteAnnouncementProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      {children({ isSubmitting, proceed: () => setShow(true) })}
      <Modal
        {...{ show }}
        size="sm"
        onHide={() => {
          setShow(false);
        }}
        header="Delete Announcement"
      >
        <>
          <p className="text-center my-4">
            Are you sure you wan to delete <br />
            <b>{announcement.title}</b>?
          </p>
          <div className="flex gap-8 justify-end">
            <Button
              type="reset"
              onClick={() => {
                setShow(false);
              }}
              className={classNames(
                "border",
                "border-neutral-30 dark:border-neutral-10"
              )}
            >
              No, Cancel
            </Button>
            <Button
              type="submit"
              className="bg-error text-white"
              {...{ isSubmitting }}
              onClick={() => {
                setIsSubmitting(true);
                onDelete({
                  setSubmitting: (key) => setIsSubmitting(key),
                  hide: () => setShow(false),
                  id: announcement._id!,
                });
              }}
            >
              Yes, Delete
            </Button>
          </div>
        </>
      </Modal>
    </>
  );
};

export default DeleteAnnouncement;
