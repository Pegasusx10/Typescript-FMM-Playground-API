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
exports.deletePassengers = exports.updatePassengers = exports.getPassenger = exports.getPassengers = exports.createPassengers = void 0;
const passengers_1 = __importDefault(require("../models/passengers"));
const queryCondition = require('../utils/queryLogic');
// Create a Passenger
const createPassengers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPassengers = new passengers_1.default({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        passportNo: req.body.passportNo,
        country: req.body.country,
    });
    try {
        const freshPassengers = yield newPassengers.save();
        res.status(201).send(freshPassengers);
    }
    catch (err) {
        res.status(404).send({ message: `The Flight you're looking for does not exist!` });
    }
});
exports.createPassengers = createPassengers;
// Get all Passengers
const getPassengers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pageSize = req.query.pageSize;
        let pageNumber = req.query.pageNumber;
        if (typeof pageSize !== 'string') {
            pageSize = "0";
        }
        ;
        if (typeof pageNumber !== 'string') {
            pageNumber = "1";
        }
        ;
        const pageSizeValue = parseInt(pageSize, 10) || 0;
        const pageNumberValue = parseInt(pageNumber, 10) || 1;
        const queries = queryCondition(req.query);
        const passenger = passengers_1.default
            .find(queries)
            .limit(pageSizeValue)
            .skip((pageNumberValue - 1) * pageSizeValue);
        // .populate('passengers')
        // .populate('delays')
        res.status(200).send(passenger);
    }
    catch (err) {
        res.status(404).send({ message: "The Flight you are looking for does not exist!" });
    }
});
exports.getPassengers = getPassengers;
// Get a single Passenger
const getPassenger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const onePassenger = passengers_1.default.findById(req.params.id);
        // .populate('passengers')
        // .populate('delays');
        res.status(200).send(onePassenger);
    }
    catch (err) {
        res.status(404).send({ message: `The Flight you're looking for does not exist!` });
    }
});
exports.getPassenger = getPassenger;
// Update flight by ID
const updatePassengers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPassenger = passengers_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(updatedPassenger);
    }
    catch (err) {
        res.status(500).send({ message: `An error occurred while updating the record` });
    }
});
exports.updatePassengers = updatePassengers;
// Delete a single Flight
const deletePassengers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flightId = passengers_1.default.findByIdAndDelete(req.params.id);
        res.send(`The Flight has been deleted from database successfully!`);
    }
    catch (err) {
        res.status(404).send(`The Flight you're looking for does not exist!`);
    }
});
exports.deletePassengers = deletePassengers;
