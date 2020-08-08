import "reflect-metadata";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import cors from "cors";

import routes from "@shared/infra/http/routes/routes";

import "@shared/container/container";

import DbConnection from "@shared/infra/typeorm/database";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.use(errorHandler)

app.listen(3334, async () => {
  await DbConnection();
  console.log("Server started!");
});

// 2694 4574 7117 76,47
// 3616 2570 0685 12,99
