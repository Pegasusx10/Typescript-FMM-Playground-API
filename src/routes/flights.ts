import { Router } from "express";
import {
  createflights,
  getflights,
  updateflights,
  deleteflights,
} from "../controller/flights";

const router = Router();

router.post("/", createflights);

router.get("/", getflights);

router.patch("/:id", updateflights);

router.delete("/:id", deleteflights);

export default router;