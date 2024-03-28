import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongo database is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "AI-Prompts",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Mongo Database is now connected");
  } catch (error) {
    console.log(`${error}:db not connected`);
  }
};
