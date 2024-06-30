import React, { ReactNode, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { object } from "yup";

import useAnnouncement from "@/hooks/useAnnouncement";
import { Button, Field, Modal } from "@/components";
import { classNames, schema } from "@/libs";
import { IAnnouncement } from "@/types";
import { useStore } from "@/hooks";

interface AddAnnouncementProps {
  children: (props: { proceed: () => void }) => ReactNode;
  announcementID?: string;
  onAdd: (
    values: Partial<IAnnouncement>,
    actions: FormikHelpers<Partial<IAnnouncement>>,
    hide: () => void
  ) => void;
}

const AddAnnouncement = ({
  children,
  announcementID,
  onAdd,
}: AddAnnouncementProps) => {
  const { store } = useStore();
  const [show, setShow] = useState<boolean>(false);

  const { data, mutate } = useAnnouncement(announcementID);
  console.log(data);

  return (
    <>
      {children({ proceed: () => setShow(true) })}
      <Modal
        {...{ show }}
        size="xl"
        onHide={() => {
          setShow(false);
        }}
        header="New Announcement"
      >
        <Formik
          validateOnMount
          enableReinitialize
          validationSchema={object({
            title: schema.requireString("Title"),
            details: schema.requireString("Details"),
          })}
          initialValues={{
            title: data?.title ?? "",
            details: data?.details ?? "",
          }}
          onSubmit={(values: Partial<IAnnouncement>, actions) => {
            onAdd(values, actions, () => {
              mutate();
              setShow(false);
            });
          }}
        >
          {({
            values,
            isValid,
            isSubmitting,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
          }) => (
            <div className="flex flex-col gap-4">
              <Field.Group required name="title" label="Title">
                <Field.Input name="title" value={values.title} />
              </Field.Group>

              <Field.Group required name="details" label="Details">
                <Field.TextEditor
                  content={values.details}
                  onChange={(data: any) => {
                    setFieldValue("details", data);
                  }}
                />
              </Field.Group>

              <div className="flex gap-8 justify-end mt-20">
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
                  Discard
                </Button>
                <Button
                  type="submit"
                  className="bg-info text-white"
                  onClick={() => {
                    handleSubmit();
                  }}
                  disabled={!isValid}
                  {...{ isSubmitting }}
                >
                  {announcementID ? "Update" : "Add"} Announcement
                </Button>
              </div>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddAnnouncement;
