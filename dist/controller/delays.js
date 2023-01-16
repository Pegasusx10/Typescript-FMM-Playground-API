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
const flights_1 = __importDefault(require("../models/flights"));
// Create a single Delay
const createDelays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newDelay = new delays_1.default({
        code: req.body.code,
        reason: req.body.reason,
        time: req.body.time
    });
    // Validate firstName & lastName to be unique
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    delays_1.default.findOne({ firstName: firstName, lastName: lastName }, (err, Delays) => {
        if (err) {
            return;
        }
        if (delays_1.default) {
            res.send({ error: 'The delay cannot be added since the delay already exsist in the database' });
        }
        else {
            res.send({ success: 'The delay has been successfully added to the database' });
        }
    });
    try {
        const freshDelay = yield newDelay.save();
        res.status(201).json(freshDelay);
    }
    catch (err) {
        res.status(404).json(`The Delay you're looking for does not exist!`);
    }
});
exports.createDelays = createDelays;
// get all  Delay
const getDelays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pageSize = req.query.pageSize;
        let pageNumber = req.query.pageNumber;
        if (typeof pageSize !== 'string') {
            pageSize = "0";
        }
        if (typeof pageNumber !== 'string') {
            pageNumber = "1";
        }
        const pageSizeValue = parseInt(pageSize, 10) || 0;
        const pageNumberValue = parseInt(pageNumber, 10) || 1;
        const queries = queryCondition(req.query);
        const Delays = yield delays_1.default
            .find(queries)
            .limit(pageSizeValue)
            .skip((pageNumberValue - 1) * pageSizeValue);
        res.status(200).json(Delays);
    }
    catch (err) {
        res.status(404).json({ message: "The Delay you are looking for does not exist!" });
    }
});
exports.getDelays = getDelays;
//get a single Delay 
const getDelay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delayInfo = yield delays_1.default.findById(req.params.id);
        res.send(delayInfo);
    }
    catch (err) {
        res.status(404).json(`Delay does not exist!`);
    }
});
exports.getDelay = getDelay;
// update a single Delay
const updateDelays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRecord = new delays_1.default(req.params.id, req.body);
        res.send(updatedRecord);
    }
    catch (err) {
        res.status(500).send(`An error occurred while updating the record`);
    }
});
exports.updateDelays = updateDelays;
// Delete a single Delay 
const deleteDelays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delayId = yield flights_1.default.findByIdAndDelete(req.params.id);
        res.send(`The delay has been deleted has been successfully deleted!`);
    }
    catch (err) {
        res.status(404).json(`The Delay you are looking for does not exsist!`);
    }
});
exports.deleteDelays = deleteDelays;
