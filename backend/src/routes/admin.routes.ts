import { Router } from "express";
import * as AdminController from "../controllers/admin.controller";

const router = Router();
router.get("/", AdminController.list);
router.patch("/:id", AdminController.update);

export default router;
