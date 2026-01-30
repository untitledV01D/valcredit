import { Router } from "express";
import * as CustomerController from "../controllers/customer.controller";

const router = Router();

router.post("/", CustomerController.create);
router.get("/:id", CustomerController.getOne);

export default router;
