import { Router } from "express";
import {
  createDelays,
  getDelays,
  getDelay,
  updateDelays,
  deleteDelays,
} from "../controller/delays";

const router = Router();

router.post("/delays", createDelays);

router.get("/delays", getDelays);

router.get("/delay/:id", getDelay);

router.patch("/delay/:id", updateDelays);

router.delete("/delay/:id", deleteDelays);

export default router;
