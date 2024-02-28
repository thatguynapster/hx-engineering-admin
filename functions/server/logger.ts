import { sentenceCase } from "@/libs";
import { LogCollection } from "../../models";

export const logEntry = async (
  collection: string,
  document_data: any,
  event: "CREATE" | "UPDATE" | "DELETE"
) => {
  return new Promise(async (resolve, reject) => {
    let message = "";
    switch (event) {
      case "CREATE":
        message = `${sentenceCase(collection)} created.`;
        break;
      case "UPDATE":
        message = `${sentenceCase(collection)} updated`;
        break;
      case "DELETE":
        message = `${sentenceCase(collection)} deleted.`;
        break;
    }

    try {
      let log = new LogCollection({
        message,
        document_data,
        event,
      });
      log = (await log.save()).toObject();
      resolve("Entry logged.");
    } catch (error) {
      reject(error);
    }
  });
};
