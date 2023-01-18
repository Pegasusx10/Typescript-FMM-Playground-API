"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDelays = exports.updateDelays = exports.getDelay = exports.getDelays = exports.createDelays = void 0;
const queryCondition = require('../utils/delayValidation');
const delays_1 = __importDefault(require("../models/delays"));
// Create a single Delay
const createDelays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newDelay = new delays_1.default({
        code: req.body.code,
        reason: req.body.reason,
        time: req.body.time
    });
    try {
        const freshDelay = yield newDelay.save();
        res.status(201).send(freshDelay);
    }
    catch (err) {
        res.status(404).send(`The Delay you're looking for does not exist!`);
    }
});
exports.createDelays = createDelays;
// get all  Delay
const getDelays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pageSize = req.query.pageSize;
        let pageNumber = req.query.pageNumber;
        if (typeof pageSize !== 'number') {
            pageSize = "0";
        }
        if (typeof pageNumber !== 'number') {
            pageNumber = "1";
        }
        const pageSizeValue = parseInt(pageSize, 10) || 0;
        const pageNumberValue = parseInt(pageNumber, 10) || 1;
        const queries = queryCondition(req.query);
        const allDelays = yield delays_1.default
            .find(queries)
            .limit(pageSizeValue)
            .skip((pageNumberValue - 1) * pageSizeValue);
        res.status(200).send(allDelays);
    }
    catch (err) {
        res.status(404).send({ message: "The Delay you are looking for does not exist!" });
    }
});
exports.getDelays = getDelays;
// Get a single Delay
const getDelay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleDelay = yield delays_1.default.findById(req.params.id);
        res.send(singleDelay);
    }
    catch (err) {
        res.status(404).send(`Delay does not exist!`);
    }
});
exports.getDelay = getDelay;
// Update a single Delay
const updateDelays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRecord = yield delays_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedRecord);
    }
    catch (err) {
        res.status(500).send({ message: `An error occurred while updating the record` });
    }
});
exports.updateDelays = updateDelays;
// Delete a single Delay
const deleteDelays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delayId = yield delays_1.default.findByIdAndDelete(req.params.id);
        res.send(`The delay has been deleted successfully!`);
    }
    catch (err) {
        res.status(404).send({ message: `The Delay you are looking for does not exist!` });
    }
});
exports.deleteDelays = deleteDelays;
