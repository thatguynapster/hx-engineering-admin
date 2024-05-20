import { Button, Field, Modal } from "@/components";
import { useProduct, useStore } from "@/hooks";
import { classNames, schema } from "@/libs";
import { uploadProductImageService } from "@/services";
import { IApiResponse, ICategory, IProduct } from "@/types";
import { Formik, FormikHelpers } from "formik";
import React, { ReactNode, useMemo, useState } from "react";
import useSWR from "swr";
import { object } from "yup";

interface AddCategoryProps {
  children: (props: { proceed: () => void }) => ReactNode;
  onAdd: (
    values: Partial<ICategory>,
    actions: FormikHelpers<Partial<ICategory>>,
    hide: () => void
  ) => void;
}

const AddCategory = ({ children, onAdd }: AddCategoryProps) => {
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
        header="Add Category"
      >
        <Formik
          validateOnMount
          enableReinitialize
          validationSchema={object({
            name: schema.requireString("cAtegory Name"),
            description: schema.requireString("cAtegory Description"),
          })}
          initialValues={{
            name: "",
            description: "",
          }}
          onSubmit={(values: Partial<ICategory>, actions) => {
            onAdd(values, actions, () => setShow(false));
          }}
        >
          {({ values, isValid, isSubmitting, handleSubmit }) => (
            <div className="flex flex-col gap-4">
              <Field.Group required name="name" label="Name">
                <Field.Input name="name" value={values.name} />
              </Field.Group>

              <Field.Group required name="description" label="Description">
                <Field.Input name="description" value={values.description} />
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
                  Add Category
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
