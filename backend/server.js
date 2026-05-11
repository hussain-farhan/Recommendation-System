import { config } from "dotenv";
import cors from "cors";
import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { seedDB } from "./src/utils/seedDB.js";

config();

// Register CORS middleware BEFORE starting the server
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  const seed = await seedDB();
  if (seed.seeded) {
    console.log(`Seeded Projects collection (${seed.count} docs)`);
  }

  // Only ONE app.listen — after DB is ready
  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});