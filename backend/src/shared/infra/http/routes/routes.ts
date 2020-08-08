import { Router } from "express";

import classesRouter from "@modules/classes/infra/http/routes/classes.routes.ts";

const routes = Router();

routes.use("/classes", classesRouter);

routes.get("/", (request, response) => {
  return response.send("hello");
});

export default routes;
