import { Field, Modal } from "@/components";
import { useStore } from "@/hooks";
import { UploadProductImageService } from "@/services";
import { IApiResponse, ICategory, IProduct } from "@/types";
import { Formik } from "formik";
import React, { ReactNode, useMemo, useState } from "react";
import useSWR from "swr";
import { object } from "yup";

interface AddProductProps {
  children: (props: { proceed: () => void }) => ReactNode;
  productID?: IProduct;
  onAdd: () => void;
}

const AddProduct = ({ children, productID }: AddProductProps) => {
  const { store } = useStore();
  const [show, setShow] = useState<boolean>(false);

  // const product = useSWR<IProduct>(productID && ``);

  const { data } = useSWR<IApiResponse>("/categories");
  const categories = (() => {
    return data?.docs.map((category: any) => ({
      value: category._id,
      label: category.name,
    }));
  })();
  console.log(categories);

  return (
    <>
      {children({ proceed: () => setShow(true) })}
      <Modal
        {...{ show }}
        size="xl"
        onHide={() => {
          setShow(false);
        }}
        header="New Product"
      >
        <Formik
          validateOnMount
          enableReinitialize
          validationSchema={object({})}
          initialValues={{
            images: [] as string[],
          }}
          onSubmit={(params: Partial<IProduct>, actions) => {}}
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
              <Field.Upload
                count={5}
                values={(values.images as any) ?? []}
                name="images"
                type={"image"}
                onValueChanged={async (file: File) => {
                  if (!values.images!.length) {
                    setFieldValue("images", [""]);
                  }
                  setFieldValue("images", [...values.images!, ""]);

                  const fd = new FormData();
                  fd.append("file", file);
                  await UploadProductImageService(fd, store.token!).then(
                    (resp) => {
                      console.log(resp, values.images, values.images!.length);
                      if (!values.images!.length) {
                        return setFieldValue("images", [resp]);
                      }
                      setFieldValue("images", [...values.images!, resp]);
                    }
                  );
                }}
                removeFile={(index) => {
                  console.log(index);
                  let temp = [...values.images!];
                  temp.splice(index, 1);
                  setFieldValue("images", temp);
                }}
                {...{ setFieldTouched }}
              />

              <div className="grid grid-cols-2 gap-4">
                <Field.Group required name="name" label="Name">
                  <Field.Input name="name" value={values.name} />
                </Field.Group>

                <Field.Group required name="name" label="Name">
                  <Field.Input name="name" value={values.name} />
                </Field.Group>

                <Field.Group required name="name" label="Name">
                  <Field.Input name="name" value={values.name} />
                </Field.Group>

                <Field.Group required name="name" label="Name">
                  <Field.Select
                    name="category"
                    defaultValue={""}
                    value={values.category}
                    options={categories ?? []}
                    onChange={({ value }: { value: string }) => {
                      setFieldValue("category", value);
                    }}
                    placeholder="Select a category"
                  />
                </Field.Group>
              </div>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddProduct;
