import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

export async function dbConnect() {
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Database connected");

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}
