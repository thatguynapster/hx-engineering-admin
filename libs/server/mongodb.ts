import mongoose from "mongoose";

// export const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL as string);
//     console.log("Database connected");
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error connecting to database");
//   }
// };

const connection: { isConnected?: number } = {};

export async function dbConnect() {
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URL!);
  console.log("Database connected");

  connection.isConnected = db.connections[0].readyState;
}
