import mongoose from "mongoose"; // Added quotes

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    // eslint-disable-next-line no-console
    console.log("MONGO_URI not set; starting without MongoDB connection"); // Added quotes
    return;
  }

  try {
    mongoose.set("strictQuery", true); // Added quotes around strictQuery
    await mongoose.connect(uri);

    // eslint-disable-next-line no-console
    console.log("MongoDB connected"); // Added quotes
  } catch (error) {
    // It's good practice to catch errors here so your app doesn't hang
    // eslint-disable-next-line no-console
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}
