import { Router } from "express";
import {
  createdelays,
  getdelays,
  updatedelays,
  deletedelays,
} from "../controller/delays";

const router = Router();

router.post("/", createdelays);

router.get("/", getdelays);

router.patch("/:id", updatedelays);

router.delete("/:id", deletedelays);

export default router;