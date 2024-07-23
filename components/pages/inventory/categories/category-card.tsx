import { ICategory } from "@/types";
import React from "react";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DeleteCategory from "./delete-category";
import { Dropdown } from "@/components";
import { classNames } from "@/libs";
import { FormikHelpers } from "formik";
import AddCategory from "./add-category";
import {
  deleteCategoryService,
  updateCategoryService,
} from "@/services/category";
import toast from "react-hot-toast";

type Props = {
  data: Partial<ICategory> & { _id: string };
  mutate: () => void;
};

const CategoryCard = ({ data: { name, description, _id }, mutate }: Props) => {
  const updateCategory = async (
    values: Partial<ICategory>,
    hide: () => void
  ) => {
    await updateCategoryService(_id, values)
      .then(() => {
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update category");
      })
      .finally(() => {
        hide();
      });
  };

  const deleteCategory = async () => {
    console.log("delete category: ", _id);

    await deleteCategoryService(_id)
      .then(() => {
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update category");
      });
  };

  return (
    <div className="relative group cursor-pointer flex flex-col gap-4 p-4 bg-neutral-20 shadow-md dark:bg-neutral-dark rounded-lg">
      <div className="flex absolute right-0 top-0 rounded-lg">
        <Dropdown>
          <Dropdown.Toggle className="flex items-center justify-center p-4">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="min-w-40 divide-y divide-neutral-200">
            <AddCategory
              data={{ name, description, _id }}
              onAdd={updateCategory}
            >
              {({ proceed }) => (
                <Dropdown.Item
                  onClick={proceed}
                  className={classNames("py-2.5 px-4", "gap-4")}
                >
                  <PencilIcon className="w-5 h-5" />
                  <p className="text-sm">Edit</p>
                </Dropdown.Item>
              )}
            </AddCategory>

            <DeleteCategory
              onSubmit={({ setSubmitting }) => {
                setSubmitting(true);
                deleteCategory();
              }}
            >
              {({ proceed }) => (
                <Dropdown.Item
                  onClick={proceed}
                  className={classNames(
                    "py-2.5 px-4",
                    "gap-4",
                    "hover:!bg-error/10 !text-error"
                  )}
                >
                  <TrashIcon className="w-5 h-5" />
                  <p className="text-sm">Delete</p>
                </Dropdown.Item>
              )}
            </DeleteCategory>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-neutral-40 line-clamp-5">{description}</p>
    </div>
  );
};

export default CategoryCard;
