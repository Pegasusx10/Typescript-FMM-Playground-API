import { Router } from "express";
import {
  createPassengers,
  getPassengers,
  updatePassengers,
  deletePassengers,
} from "../controller/passengers";

const router = Router();

router.post("/", createPassengers);

router.get("/", getPassengers);

router.patch("/:id", updatePassengers);

router.delete("/:id", deletePassengers);

export default router;