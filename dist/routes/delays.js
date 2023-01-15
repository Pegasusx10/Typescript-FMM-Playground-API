"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delays_1 = require("../controller/delays");
const router = (0, express_1.Router)();
router.post("/", delays_1.createDelays);
router.get("/", delays_1.getDelays);
router.patch("/:id", delays_1.updateDelays);
router.delete("/:id", delays_1.deleteDelays);
exports.default = router;
