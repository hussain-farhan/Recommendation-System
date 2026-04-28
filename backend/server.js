import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "backend",
    message: "Backend is running",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "Not Found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = Number(err?.status || err?.statusCode || 500);
  res.status(status).json({
    ok: false,
    error: err?.message || "Internal Server Error",
  });
});

const PORT = Number(process.env.PORT || 5000);
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  if (MONGO_URI) {
    await mongoose.connect(MONGO_URI);
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } else {
    // eslint-disable-next-line no-console
    console.log("MONGO_URI not set; starting without MongoDB connection");
  }

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

