import { config } from "dotenv";
import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";

config();

const PORT = Number(process.env.PORT || 5000);

async function start() {
  await connectDB();

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

