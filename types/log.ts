export type ILog = {
  message: string;
  document_data: any;
  event: "CREATE" | "UPDATE" | "DELETE";
};
