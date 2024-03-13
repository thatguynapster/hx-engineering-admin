import multer from "multer";
import { ID, InputFile, storage } from "@/libs/server";

export const upload_file = async (file: any, bucket: string) => {
  return new Promise(async (resolve, reject) => {
    const key = `${file.name.split(".")[0]}_${new Date().getTime()}.${
      file.name.split(".")[1]
    }`;

    // // rename file
    // file.name = key;

    const upload = storage().createFile(
      bucket,
      ID.unique(),
      InputFile.fromBlob(file, key)
    );

    try {
      upload
        .then((response) => {
          resolve(
            `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${String(
              process.env.APPWRITE_PRODUCTS_BUCKET_ID
            )}/files/${response.$id}/preview?project=${String(
              process.env.APPWRITE_PROJECT_ID
            )}`
          );
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
