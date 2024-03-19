import { Modal } from "@/components";
import { IProduct } from "@/types";
import React, { ReactNode, useState } from "react";
import useSWR from "swr";

interface AddProductProps {
  children: (props: { proceed: () => void }) => ReactNode;
  productID?: IProduct;
  onAdd: () => void;
}

const AddProduct = ({ children, productID }: AddProductProps) => {
  const [show, setShow] = useState<boolean>(false);

  const product = useSWR<IProduct>(productID && ``);

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
        <></>
      </Modal>
    </>
  );
};

export default AddProduct;
