import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import * as Restart from "@restart/ui";

import { classNames } from "@/libs";
import { Button } from "@/components";

/* eslint-disable-next-line */
export interface ModalProps extends Restart.ModalProps {
  index?: number;
  show: boolean;
  header?: string;
  onHide?: () => void;
  size?: "sm" | "lg" | "xl" | "full";
}

export function Modal({
  show,
  size,
  header,
  children,
  index = 0,
  className,
  ...props
}: ModalProps) {
  /**
   * variables
   */
  const sizeClassName = (() => {
    switch (size) {
      case "sm":
        return "max-w-[400px] rounded-lg";
      case "lg":
        return "max-w-[720px] rounded-lg";
      case "xl":
        return "max-w-[1000px] rounded-lg";
      case "full":
        return "max-w-full h-screen overflow-y-auto";
      default:
        return "max-w-[500px] rounded-lg";
    }
  })();

  const zIndex = 1050 + index * 5;

  /**
   * state
   */
  const [showModal, setShowModal] = useState(false);

  /**
   * effect
   */
  useEffect(() => {
    if (show) {
      setShowModal(true);
    }

    if (!show) {
      setTimeout(() => setShowModal(false), 300);
    }
  }, [show]);

  return (
    <Restart.Modal
      show={showModal}
      aria-labelledby="modal"
      renderBackdrop={(props) => (
        <motion.div
          {...props}
          initial="hidden"
          style={{ zIndex }}
          animate={show ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className={classNames(
            "w-full h-full",
            `fixed top-0 left-0`,
            "bg-black/50"
          )}
        />
      )}
      style={{ zIndex: zIndex + 5 }}
      className={classNames(
        "w-full h-full",
        `fixed left-0 top-0`,
        "pointer-events-none",
        "overflow-x-hidden overflow-y-auto"
      )}
      {...props}
    >
      <motion.div
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className={classNames(
          sizeClassName,
          "mx-auto w-full",
          "flex items-center",
          "min-h-[calc(100%-3rem)]",
          "relative pointer-events-none",
          size !== "full" && "my-6"
        )}
      >
        <div
          className={classNames(
            "w-full rounded-lg",
            "shadow-3xl bg-white dark:bg-neutral-dark pointer-events-auto relative",
            className || "p-6"
          )}
        >
          {header && (
            <div className="flex justify-center">
              <h5 className="mb-0 text-xl font-medium">{header}</h5>
              <Button className="p-4 ml-auto" onClick={() => props.onHide?.()}>
                <XMarkIcon className="w-5 h-5 stroke-[2.85px]" />
              </Button>
            </div>
          )}
          {children}
        </div>
      </motion.div>
    </Restart.Modal>
  );
}

export default Modal;
