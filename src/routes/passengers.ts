import { Router } from "express";
import {
  createPassengers,
  getPassengers,
  getPassenger,
  updatePassengers,
  deletePassengers,
} from "../controller/passengers";

const router = Router();

router.post("/", createPassengers);

router.get("/", getPassengers);

router.get("/", getPassenger);

router.patch("/:id", updatePassengers);

router.delete("/:id", deletePassengers);

export default router;