import { Router } from "express";
import {
  createDelays,
  getDelays,
  getDelay,
  updateDelays,
  deleteDelays,
} from "../controller/delays";

const router = Router();

router.post("/", createDelays);

router.get("/", getDelays);

router.get("/", getDelay);

router.patch("/:id", updateDelays);

router.delete("/:id", deleteDelays);

export default router;