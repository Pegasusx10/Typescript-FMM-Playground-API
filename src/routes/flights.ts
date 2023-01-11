import { Router } from "express";
import {
  createFlights,
  getFlights,
  updateFlights,
  deleteFlights,
} from "../controller/flights";

const router = Router();

router.post("/", createFlights);

router.get("/", getFlights);

router.patch("/:id", updateFlights);

router.delete("/:id", deleteFlights);

export default router;