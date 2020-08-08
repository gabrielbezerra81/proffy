import { Router } from "express";
import ClassesController from "../controllers/ClassesController";

const classesRouter = Router();

const classesController = new ClassesController();

classesRouter.post("/", classesController.create);

export default classesRouter;
