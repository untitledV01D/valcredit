import { Router } from "express";
import * as CreditController from "../controllers/creditApplication.controller";

const router = Router();
router.post("/simulate", CreditController.simulate);
router.post("/", CreditController.create);
router.get("/", CreditController.list);
router.patch("/:id", CreditController.update);

export default router;
