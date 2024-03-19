import { useRef } from "react";
import { FormikHelpers } from "formik";
import { TrashIcon } from "@heroicons/react/24/solid";

import { FileCheck, UploadIcon } from "@/components/icons";
import { Button, Field } from "@/components";
import { classNames } from "@/libs";

export interface UploadProps
  extends Pick<FormikHelpers<any>, "setFieldValue" | "setFieldTouched"> {
  value: File;
  name: string;
  size?: number;
  type: ("image" | "pdf")[];
  placeholder: string;
  withFormik?: boolean;
}

export function Upload({
  name,
  type,
  value,
  size = 2,
  placeholder,
  setFieldValue,
  setFieldTouched,
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

    if (type.includes("image")) {
      format.push(["image/jpg", "image/jpeg", "image/png", "image/webp"]);
    }

    if (type.includes("pdf")) {
      format.push(["application/pdf"]);
    }

    return format.flat();
  })();

  return (
    <>
      <input
        name={name}
        type="file"
        ref={imageRef}
        className="hidden"
        accept={format.join(", ")}
        onChange={({ currentTarget: { files } }) => {
          if (files?.[0]) {
            setFieldValue(name, files[0]);
            setTimeout(() => setFieldTouched(name, true));
          }
        }}
      />
      <div
        className={classNames(
          "p-4",
          "flex gap-2 items-center",
          "rounded-lg border border-dashed border-neutral-200"
        )}
      >
        <div className="w-full truncate">
          {value?.name && (
            <div
              className={classNames(
                "p-3",
                "rounded-lg",
                "flex gap-2",
                "bg-neutral-100"
              )}
            >
              <span className="block">
                <FileCheck />
              </span>
              <div className="truncate">
                <p className="text-sm truncate">{value.name}</p>
                <p className="text-xs text-muted">
                  Uploaded {(value.size / 1000000).toFixed(2)}/{size}MB
                </p>
              </div>
            </div>
          )}
          {!value?.name && <p className="text-muted text-xs">{placeholder}</p>}
        </div>

        <Button
          type="button"
          className="btn-outline btn-sm"
          onClick={() => imageRef.current.click()}
        >
          <UploadIcon className="w-4 h-4" />
          <span>Upload</span>
        </Button>
        <Button
          type="button"
          disabled={!value?.name}
          onClick={() => {
            setFieldValue(name, {});
            imageRef.current.value = "";
          }}
          className="btn btn-outline-danger btn-sm !px-2.5"
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
      </div>

      <Field.Error name={name} {...{ withFormik }} />
    </>
  );
}

export default Upload;
