import { Router } from "express";

import classesRouter from "@modules/classes/infra/http/routes/classes.routes";

import connectionsRouter from "@modules/connections/infra/http/routes/connections.routes";

const routes = Router();

routes.use("/classes", classesRouter);

routes.use("/connections", connectionsRouter);

routes.get("/", (request, response) => {
  return response.send("hello");
});

export default routes;
