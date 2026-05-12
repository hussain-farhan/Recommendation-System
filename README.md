# ProjectMatch

Monorepo layout:

- **`frontend`** — React (Vite) app. Run `npm install` and `npm run dev` from this folder. The dev server proxies `/api` to `http://localhost:5000`.
- **`backend`** — Express API. Run `npm install` and `npm run dev` from this folder (default port per your `server.js` / `.env`).

Start the backend first (or ensure it is on the port the frontend proxy expects), then start the frontend.

## Deploy backend on Render

1. Create a **Web Service** and point it at this repo.
2. Set **Root Directory** to the folder that contains this backend `package.json` (for this monorepo, that is `webProject/backend` if the repo root is `webProject`, or `backend` if the repo root already is the backend folder).
3. **Build Command:** `npm install && npm run build` (or `npm install; npm run build` — both work). The `build` script is a no-op success step so Render’s default pipeline passes; the API is plain Node.js with no compile step.
4. **Start Command:** `npm start`
5. **Environment variables** (in the Render dashboard): set `MONGO_URI` to your MongoDB connection string if you use a database; if it is unset, the app runs in mock project mode. Set `FRONTEND_URL` to your deployed site URL (for example `https://your-app.vercel.app`) so `server.js` CORS settings match your frontend. `PORT` is provided automatically by Render.
