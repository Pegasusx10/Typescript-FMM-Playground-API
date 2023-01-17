import { Router } from "express";
import {
  createFlights,
  getFlights,
  getFlight,
  updateFlights,
  deleteFlights,
  cancelledFlights
} from "../controller/flights";

const router = Router();

router.post("/flights", createFlights);

router.get("/flights", getFlights);

router.get("/flight/:id", getFlight);

router.get("/flights/show_cancelled", cancelledFlights);

router.patch("/flight/:id", updateFlights);

router.delete("/flight/:id", deleteFlights);

export default router;
