import { Router } from "express";
import {
  createPassengers,
  getPassengers,
  getPassenger,
  updatePassengers,
  deletePassengers,
} from "../controller/passengers";

const router = Router();

router.post("/passengers", createPassengers);

router.get("/passengers", getPassengers);

router.get("/passenger/:id", getPassenger);

router.put("/passenger/:id", updatePassengers);

router.delete("/passenger/:id", deletePassengers);

export default router;
