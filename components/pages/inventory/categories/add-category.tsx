import React, { ReactNode, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { object } from "yup";

import { Button, Field, Modal } from "@/components";
import { classNames, schema } from "@/libs";
import { ICategory } from "@/types";

interface AddCategoryProps {
  data?: Partial<ICategory>;
  children: (props: { proceed: () => void }) => ReactNode;
  onAdd: (values: Partial<ICategory>, hide: () => void) => void;
}

const AddCategory = ({ children, data, onAdd }: AddCategoryProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      {children({ proceed: () => setShow(true) })}
      <Modal
        {...{ show }}
        size="sm"
        onHide={() => {
          setShow(false);
        }}
        header={`${data ? "Edit" : "Add"} Category`}
      >
        <Formik
          validateOnMount
          enableReinitialize
          validationSchema={object({
            name: schema.requireString("cAtegory Name"),
            description: schema.requireString("cAtegory Description"),
          })}
          initialValues={{
            name: data?.name ?? "",
            description: data?.description ?? "",
          }}
          onSubmit={(values: Partial<ICategory>, actions) => {
            onAdd(values, () => setShow(false));
          }}
        >
          {({ values, isValid, isSubmitting, handleSubmit }) => (
            <div className="flex flex-col gap-4">
              <Field.Group required name="name" label="Name">
                <Field.Input name="name" value={values.name} />
              </Field.Group>

              <Field.Group required name="description" label="Description">
                <Field.Input
                  name="description"
                  as="textarea"
                  rows="5"
                  value={values.description}
                />
              </Field.Group>

              <div className="flex gap-8 justify-end mt-16">
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
                  {data ? "Save" : "Add Category"}
                </Button>
              </div>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddCategory;
