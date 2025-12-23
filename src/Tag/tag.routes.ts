import express from "express";
import { TagController } from "./tag.controller";

const TagRouter: express.Router = express.Router();

TagRouter.get("/tags", TagController.getAll);
TagRouter.get("/tags/:id", TagController.getByID);

export { TagRouter };
