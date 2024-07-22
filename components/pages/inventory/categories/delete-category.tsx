import { Confirm } from "@/components";
import { IProduct } from "@/types";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import { ReactElement, useState } from "react";

interface DeleteCategoryProps {
  onSubmit: (props: { setSubmitting: (key: boolean) => void }) => void;
  children: ({
    proceed,
    isSubmitting,
  }: {
    isSubmitting: boolean;
    proceed: () => void;
  }) => ReactElement;
}

const DeleteCategory = ({ children, onSubmit }: DeleteCategoryProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = () =>
    Confirm({
      message: (
        <div className="text-center">
          <div className="rounded-full flex bg-red-50 mx-auto mb-6 w-14 h-14">
            <div className="text-primary rounded-full bg-red-100 flex w-10 h-10 m-auto">
              <ArchiveBoxXMarkIcon className="text-red-600 m-auto w-6 h-6" />
            </div>
          </div>
          <h5 className="te xt-xl mb-2 font-semibold capitalize">
            delete category
          </h5>
          <small className="text-muted">
            Are you sure you want to delete this expense entry? Please note that
            this action cannot be undone.
          </small>
        </div>
      ),
      buttons: {
        proceed: {
          value: "Delete",
          className: "bg-error w-full text-white",
        },
        cancel: {
          value: "Cancel",
        },
      },
    }).then((proceed) => {
      if (proceed) {
        onSubmit({
          setSubmitting: (key) => {
            setIsSubmitting(key);
          },
        });
      }
    });

  return <>{children({ isSubmitting, proceed: () => handleDelete() })}</>;
};

export default DeleteCategory;
