import { Router } from "express";
import {
  createDelays,
  getDelays,
  updateDelays,
  deleteDelays,
} from "../controller/delays";

const router = Router();

router.post("/", createDelays);

router.get("/", getDelays);

router.patch("/:id", updateDelays);

router.delete("/:id", deleteDelays);

export default router;