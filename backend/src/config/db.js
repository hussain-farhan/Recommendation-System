import mongoose from "mongoose";

let memoryServer;

export async function connectDB() {
  mongoose.set("strictQuery", true);

  let uri = process.env.MONGO_URI;

  try {
    if (!uri) {
      // No local MongoDB required: start an in-memory server for development.
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      memoryServer = await MongoMemoryServer.create();
      uri = memoryServer.getUri("webProject");

      // eslint-disable-next-line no-console
      console.warn(
        `MONGO_URI is not set; using in-memory MongoDB (${uri}). Data resets on restart.`
      );
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } catch (error) {
    const msg = String(error?.message || error);
    const hint =
      msg.includes("ECONNREFUSED") || msg.includes("Server selection timed out")
        ? "MongoDB is not reachable. Start MongoDB (or point MONGO_URI to MongoDB Atlas) then retry."
        : "Check that MONGO_URI is correct and MongoDB is running.";

    const err = new Error(`MongoDB connection failed: ${msg}. ${hint}`);
    err.status = 500;
    throw err;
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = undefined;
  }
}
