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
exports.deleteFlights = exports.updateFlights = exports.getFlight = exports.getFlights = exports.createFlights = void 0;
const queryCondition = require('../utils/flightValidation');
const flights_1 = __importDefault(require("../models/flights"));
// Create a flight
const createFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newFlight = new flights_1.default({
        flightNumber: req.body.flightNumber,
        tailNumber: req.body.tailNumber,
        origin: req.body.origin,
        destination: req.body.destination,
        iropStatus: req.body.iropStatus,
        totalSeats: req.body.totalSeats,
        passengers: req.body.passengers,
        hasBusinessClass: req.body.hasBusinessClass,
        delay: req.body.delay,
    });
    try {
        const freshFlights = yield newFlight.save();
        res.status(201).json(freshFlights);
    }
    catch (err) {
        res.status(404).json(`The Flight you're looking for does not exist!`);
    }
});
exports.createFlights = createFlights;
// Get all flights
const getFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const Flight = yield flights_1.default
            .find(queries)
            .limit(pageSizeValue)
            .skip((pageNumberValue - 1) * pageSizeValue);
        res.status(200).json(Flight);
    }
    catch (err) {
        res.status(404).json({ message: "The Flight you are looking for does not exist!" });
    }
});
exports.getFlights = getFlights;
// Get a single flight 
const getFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Flights = yield flights_1.default.findById(req.params.id);
        // .populate('passengers')
        res.send(Flights);
    }
    catch (err) {
        res.status(404).json(`The Flight you're looking for does not exist!`);
    }
});
exports.getFlight = getFlight;
// Update flight by ID
const updateFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedflights = new flights_1.default(req.params.id, req.body);
        res.send(updatedflights);
    }
    catch (err) {
        res.status(500).send(`An error occurred while updating the record`);
    }
});
exports.updateFlights = updateFlights;
// Delete a single Flight
const deleteFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flightId = yield flights_1.default.findByIdAndDelete(req.params.id);
        res.send(`The Flight has been deleted from database successfully!`);
    }
    catch (err) {
        res.status(404).json(`The Flight you're looking for does not exist!`);
    }
});
exports.deleteFlights = deleteFlights;
