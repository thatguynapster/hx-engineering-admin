import { Client, Storage } from "node-appwrite";

export const storage = () => {
  const client = new Client()
    .setEndpoint(String(process.env.APPWRITE_ENDPOINT))
    .setProject(String(process.env.APPWRITE_PROJECT_ID))
    .setKey(String(process.env.APPWRITE_API_KEY));

  const storage = new Storage(client);
  return storage;
};

export const authUser = (authorization: string) => {
  let token: string;
  token = authorization?.startsWith("Bearer ")
    ? authorization.split(" ")[1]
    : "";

  const client = new Client()
    .setEndpoint(String(process.env.APPWRITE_ENDPOINT))
    .setProject(String(process.env.APPWRITE_PROJECT_ID))
    .setJWT(token);

  return client;
};

export { ID, InputFile } from "node-appwrite";
