import { Router } from "express";
import {
  createFlights,
  getFlights,
  getFlight,
  updateFlights,
  deleteFlights
} from "../controller/flights";

const router = Router();

router.post("/", createFlights);

router.get("/", getFlights);

router.get("/", getFlight);

router.patch("/:id", updateFlights);

router.delete("/:id", deleteFlights);

export default router;