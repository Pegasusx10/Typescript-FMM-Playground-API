import { Router } from "express";
import {
  createpassengers,
  getpassengers,
  updatepassengers,
  deletepassengers,
} from "../controller/passengers";

const router = Router();

router.post("/", createpassengers);

router.get("/", getpassengers);

router.patch("/:id", updatepassengers);

router.delete("/:id", deletepassengers);

export default router;