import { Router } from "express";
import { usersRouter } from "./users.routes.js";
import { projectsRouter } from "./projects.routes.js";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({ ok: true, message: "API root" });
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/projects", projectsRouter);

