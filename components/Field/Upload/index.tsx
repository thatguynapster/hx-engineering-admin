"use client";

import { useRef, useState } from "react";
import { FormikHelpers } from "formik";
import { TrashIcon } from "@heroicons/react/24/solid";

import { FileCheck, Spinner, UploadIcon } from "@/components/icons";
import { Button, Field } from "@/components";
import { classNames } from "@/libs";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export interface UploadProps
  extends Pick<FormikHelpers<any>, "setFieldTouched"> {
  values: File[] | string[];
  name: string;
  // multiple?: boolean;
  preview?: boolean;
  count?: number;
  // size?: number;
  type: "image" | "pdf";
  // placeholder: string;
  withFormik?: boolean;
  removeFile: (index: number) => void;
  onValueChanged: (value: File) => void;
}

export function Upload({
  name,
  type,
  values,
  count = 1,
  preview = true,
  // size = 2,
  // placeholder,
  onValueChanged,
  setFieldTouched,
  removeFile,
  withFormik = true,
}: UploadProps) {
  /**
   * refs
   */
  const imageRef = useRef<any>();

  /**
   * variables
   */
  const format: string[] = (() => {
    const format = [];

    if (type === "image") {
      format.push(["image/jpg", "image/jpeg", "image/png", "image/webp"]);
    }

    if (type === "pdf") {
      format.push(["application/pdf"]);
    }

    return format.flat();
  })();

  return (
    <>
      <input
        name={name}
        type="file"
        multiple={count > 1}
        ref={imageRef}
        className="hidden"
        accept={format.join(", ")}
        onChange={({ currentTarget: { files } }) => {
          console.log(files);
          if (files?.[0]) {
            onValueChanged(files[0]);
            setTimeout(() => setFieldTouched(name, true));
          }
        }}
      />
      <div
        className={classNames(
          "p-4",
          "flex gap-2 items-center",
          "rounded-lg",
          "bg-white dark:bg-neutral-gray"
        )}
      >
        <div className="w-full flex flex-grow gap-5 items-center">
          {preview &&
            values &&
            Object.values(values).map((preview, index) => {
              return (
                <div
                  key={index}
                  className={classNames(
                    "border-neutral-40 dark:border-neutral-20",
                    "flex items-center justify-center",
                    "border border-dashed",
                    "rounded-xl",
                    "bg-white dark:bg-transparent",
                    "w-20 h-20",
                    "relative group"
                  )}
                >
                  {preview !== "" && (
                    <div
                      className="w-5 h-5 cursor-pointer absolute top-0 right-0 bg-neutral-50/70 hidden group-hover:block"
                      onClick={() => {
                        removeFile(index);
                        imageRef.current.value = "";
                      }}
                    >
                      <TrashIcon className="w-5 h-5 text-error" />
                    </div>
                  )}

                  {type === "image" ? (
                    preview === "" ? (
                      <Spinner />
                    ) : (
                      <Image
                        className="rounded-xl"
                        src={preview}
                        width={80}
                        height={80}
                        alt={`Product Image ${index}`}
                      />
                    )
                  ) : (
                    <>
                      <span className="block">
                        <FileCheck />
                      </span>
                    </>
                  )}
                </div>
              );
            })}

          {count > values.length && (
            <>
              <div
                className={classNames(
                  "border-neutral-40 dark:border-neutral-20",
                  "flex items-center justify-center",
                  "border border-dashed",
                  "cursor-pointer",
                  "rounded-xl",
                  "w-20 h-20"
                )}
                onClick={() => imageRef.current.click()}
              >
                <PlusIcon className="w-6 h-6" />
              </div>

              <div className="flex flex-col gap-4">
                <p
                  className={classNames("text-neutral-40 dark:text-neutral-10")}
                >
                  Add up to {count - values.length} {type}
                  {count - values.length > 1 && "s"}
                </p>
                <p
                  className="text-primary cursor-pointer"
                  onClick={() => imageRef.current.click()}
                >
                  Select image
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <Field.Error name={name} {...{ withFormik }} />
    </>
  );
}

export default Upload;
