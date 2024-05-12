import { Button, Field, Modal } from "@/components";
import { useProduct, useStore } from "@/hooks";
import { classNames, schema } from "@/libs";
import { uploadProductImageService } from "@/services";
import { IApiResponse, ICategory, IProduct } from "@/types";
import { Formik, FormikHelpers } from "formik";
import React, { ReactNode, useMemo, useState } from "react";
import useSWR from "swr";
import { object } from "yup";

interface AddProductProps {
  children: (props: { proceed: () => void }) => ReactNode;
  productID?: string;
  onAdd: (
    values: Partial<IProduct>,
    actions: FormikHelpers<Partial<IProduct>>,
    hide: () => void
  ) => void;
}

const AddProduct = ({ children, productID, onAdd }: AddProductProps) => {
  const { store } = useStore();
  const [show, setShow] = useState<boolean>(false);

  const { data } = useProduct(productID, { category_details: true });

  const { data: categoriesDAta } = useSWR<IApiResponse>("/categories");
  const categories = (() => {
    return categoriesDAta?.docs.map((category: any) => ({
      value: category._id,
      label: category.name,
    }));
  })();

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
          validationSchema={object({
            name: schema.requireString("Product Name"),
            images: schema.requireArray("Product Image"),
            cost_price: schema.requireNumber("Product Cost Price").min(1),
            sale_price: schema.requireNumber("Product Sale Price").min(1),
            quantity: schema.requireNumber("Product Quantity").min(1),
            details: schema.requireString("Product Details"),
            category: schema.requireString("Category"),
          })}
          initialValues={{
            images: data?.images as string[],
            cost_price: data?.cost_price ?? 0,
            sale_price: data?.sale_price ?? 0,
            quantity: data?.quantity ?? 0,
            details: data?.details ?? "",
            name: data?.name ?? "",
            category: data?.category ?? "",
            featured: data?.featured ?? false,
          }}
          onSubmit={(values: Partial<IProduct>, actions) => {
            onAdd(values, actions, () => setShow(false));
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
              <Field.Upload
                count={5}
                values={values.images ?? []}
                name="images"
                type={"image"}
                onValueChanged={async (file: File) => {
                  if (!values.images!.length) {
                    setFieldValue("images", [""]);
                  }
                  setFieldValue("images", [...values.images!, ""]);

                  const fd = new FormData();
                  fd.append("file", file);
                  await uploadProductImageService(fd).then((resp) => {
                    if (!values.images!.length) {
                      return setFieldValue("images", [resp]);
                    }
                    setFieldValue("images", [...values.images!, resp]);
                  });
                }}
                removeFile={(index) => {
                  let temp = [...values.images!];
                  temp.splice(index, 1);
                  setFieldValue("images", temp);
                }}
                {...{ setFieldTouched }}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Field.Group required name="name" label="Name">
                  <Field.Input name="name" value={values.name} />
                </Field.Group>

                <Field.Group required name="category" label="Category">
                  <Field.Select
                    name="category"
                    value={values.category}
                    options={categories ?? []}
                    onChange={({ value }: { value: string }) => {
                      setFieldValue("category", value);
                    }}
                    placeholder="Select a category"
                  />
                </Field.Group>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Field.Group required name="cost_price" label="Item Price">
                  <Field.Input name="cost_price" value={values.cost_price} />
                </Field.Group>

                <Field.Group required name="sale_price" label="Sale Price">
                  <Field.Input name="sale_price" value={values.sale_price} />
                </Field.Group>

                <Field.Group required name="quantity" label="Quantity">
                  <Field.Input name="quantity" value={values.quantity} />
                </Field.Group>
              </div>

              <Field.Group required name="cost_price" label="Item Price">
                <Field.Toggle
                  title="Feature product"
                  enabled={values.featured ?? false}
                  setEnabled={(value: boolean) => {
                    console.log(value);
                    setFieldValue("featured", value);
                  }}
                />
              </Field.Group>

              <Field.Group required name="details" label="Product Description">
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
                  {productID ? "Update" : "Add"} Product
                </Button>
              </div>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddProduct;
